// Audio capture + blob storage for the "grabar y revisar" feature.
//
// v1 records MIC ONLY via getUserMedia + MediaRecorder. The beat plays aloud
// through the device speakers, so some bleed into the mic is expected (and
// useful for review). All blobs live in IndexedDB so the same code path works
// in the browser AND inside the Capacitor webview — hence every saved
// recording uses `storage: 'idb'`.
//
// Everything here is client-only; each entry point guards on `typeof window`.

// ── Feature detection ─────────────────────────────────────────────

export function recordingSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    typeof window.MediaRecorder !== 'undefined'
  );
}

// Pick the first mimeType the platform can actually record. webm/opus is the
// browser default; mp4/aac is the Safari / iOS-webview fallback. Returning ''
// lets MediaRecorder choose its own default as a last resort.
function pickMimeType(): string {
  if (
    typeof window === 'undefined' ||
    typeof window.MediaRecorder === 'undefined' ||
    typeof MediaRecorder.isTypeSupported !== 'function'
  ) {
    return '';
  }
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4;codecs=mp4a.40.2',
    'audio/mp4',
    'audio/aac',
    'audio/ogg;codecs=opus',
  ];
  for (const type of candidates) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return '';
}

// ── IndexedDB helpers ─────────────────────────────────────────────

const DB_NAME = 'tarima-recordings';
const STORE_NAME = 'blobs';
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB no disponible'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('No se pudo abrir IndexedDB'));
  });
}

export async function idbPut(key: string, blob: Blob): Promise<void> {
  const db = await openDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(blob, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('Error al guardar'));
      tx.onabort = () => reject(tx.error ?? new Error('Guardado abortado'));
    });
  } finally {
    db.close();
  }
}

export async function idbGet(key: string): Promise<Blob | null> {
  const db = await openDb();
  try {
    return await new Promise<Blob | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(key);
      req.onsuccess = () => {
        const val = req.result;
        resolve(val instanceof Blob ? val : null);
      };
      req.onerror = () => reject(req.error ?? new Error('Error al leer'));
    });
  } finally {
    db.close();
  }
}

export async function idbDelete(key: string): Promise<void> {
  const db = await openDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('Error al borrar'));
      tx.onabort = () => reject(tx.error ?? new Error('Borrado abortado'));
    });
  } finally {
    db.close();
  }
}

// ── Blob persistence (the public storage API) ─────────────────────

export async function saveRecordingBlob(blob: Blob): Promise<string> {
  const id =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const key = `rec_${id}`;
  await idbPut(key, blob);
  return key;
}

export async function loadRecordingBlob(key: string): Promise<Blob | null> {
  return idbGet(key);
}

export async function deleteRecordingBlob(key: string): Promise<void> {
  await idbDelete(key);
}

// ── Recorder controller ───────────────────────────────────────────

let mediaRecorder: MediaRecorder | null = null;
let mediaStream: MediaStream | null = null;
let chunks: Blob[] = [];
let activeMime = '';
let startedAt = 0;

function teardownStream(): void {
  if (mediaStream) {
    for (const track of mediaStream.getTracks()) track.stop();
    mediaStream = null;
  }
  mediaRecorder = null;
}

export function isRecording(): boolean {
  return mediaRecorder !== null && mediaRecorder.state === 'recording';
}

export async function startRecording(): Promise<void> {
  if (!recordingSupported()) {
    throw new Error('La grabación no está disponible en este dispositivo');
  }
  if (isRecording()) return; // already capturing

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaStream = stream;
  activeMime = pickMimeType();
  chunks = [];

  const recorder = activeMime
    ? new MediaRecorder(stream, { mimeType: activeMime })
    : new MediaRecorder(stream);
  // If the browser ignored our requested mime, trust what it reports.
  activeMime = recorder.mimeType || activeMime || 'audio/webm';

  recorder.ondataavailable = (e: BlobEvent) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  mediaRecorder = recorder;
  startedAt = Date.now();
  recorder.start();
}

export function stopRecording(): Promise<{
  blob: Blob;
  durationSec: number;
  mime: string;
}> {
  return new Promise((resolve, reject) => {
    const recorder = mediaRecorder;
    if (!recorder) {
      reject(new Error('No hay ninguna grabación en curso'));
      return;
    }
    const mime = activeMime || recorder.mimeType || 'audio/webm';
    const durationSec = Math.max(0, (Date.now() - startedAt) / 1000);

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mime });
      chunks = [];
      teardownStream();
      resolve({ blob, durationSec, mime });
    };
    recorder.onerror = () => {
      chunks = [];
      teardownStream();
      reject(new Error('Error durante la grabación'));
    };

    try {
      if (recorder.state !== 'inactive') {
        recorder.stop();
      } else {
        const blob = new Blob(chunks, { type: mime });
        chunks = [];
        teardownStream();
        resolve({ blob, durationSec, mime });
      }
    } catch (err) {
      teardownStream();
      reject(err instanceof Error ? err : new Error('Error al detener'));
    }
  });
}
