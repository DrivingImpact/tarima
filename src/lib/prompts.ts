import type { PromptKind, PromptCard, Difficulty } from './types';

// ─────────────────────────────────────────────────────────────────
// Prompt / cards system for the "drill" modes.
//
// Pure data + functions, no React. Each non-'palabras' PromptKind has a
// bank of authentic Spanish-freestyle "dejas": objects, emotions, places,
// scenes and themes to weave into the flow.
//
// Style rules baked into the data:
//  - Dialect-neutral Spanish: no tú/vos, no possessive "tu". Entries are
//    noun phrases or impersonal/infinitive scenes ("volver al barrio",
//    "se cierra una puerta") so they read the same in every accent.
//  - PG-13 / "Everyone" rating: street and emotional themes are fine, but
//    no glorified drugs/violence and no slurs.
//
// Entries can be tagged with a difficulty "tier" so harder sessions bias
// toward more abstract / demanding dejas. Untagged entries default to the
// easy/neutral pool and can appear at any difficulty.
// ─────────────────────────────────────────────────────────────────

// A single bank entry. `tier` is the *minimum* difficulty flavour it suits:
//  - 'base'     → concrete, easy to grab; appears at every difficulty.
//  - 'media'    → a bit more abstract; from 'intermedio' up.
//  - 'alta'     → abstract / demanding; mainly 'avanzado' and 'experto'.
interface BankEntry {
  text: string;
  hint?: string;
  tier?: 'base' | 'media' | 'alta';
}

// Map app Difficulty → the tiers allowed in the pool for that difficulty.
const TIERS_FOR_DIFFICULTY: Record<Difficulty, Array<NonNullable<BankEntry['tier']>>> = {
  principiante: ['base'],
  intermedio: ['base', 'media'],
  avanzado: ['base', 'media', 'alta'],
  experto: ['base', 'media', 'alta'],
};

const tierOf = (e: BankEntry): NonNullable<BankEntry['tier']> => e.tier ?? 'base';

// ── objeto: concrete objects to weave in (~50) ───────────────────
const OBJETO: BankEntry[] = [
  { text: 'una llave oxidada' },
  { text: 'un billete arrugado' },
  { text: 'el último cigarro' },
  { text: 'una foto rota' },
  { text: 'un reloj parado' },
  { text: 'una carta sin abrir' },
  { text: 'un espejo roto' },
  { text: 'unas zapatillas gastadas' },
  { text: 'un teléfono sin batería' },
  { text: 'una moneda de la suerte' },
  { text: 'una gorra vieja' },
  { text: 'un cuaderno lleno de rimas' },
  { text: 'una guitarra desafinada' },
  { text: 'un micrófono apagado' },
  { text: 'una vela casi consumida' },
  { text: 'un mapa doblado mil veces' },
  { text: 'una maleta a medio hacer' },
  { text: 'un paraguas roto' },
  { text: 'una taza con el borde partido' },
  { text: 'un casete sin etiqueta' },
  { text: 'una pulsera de hilo' },
  { text: 'un anillo que ya no entra' },
  { text: 'unas gafas trizadas' },
  { text: 'una libreta de teléfonos vieja' },
  { text: 'un boleto de tren caducado' },
  { text: 'una pelota desinflada' },
  { text: 'un candado sin llave' },
  { text: 'una radio de pilas' },
  { text: 'un farol fundido' },
  { text: 'una bandera descolorida' },
  { text: 'un cordón de zapato suelto' },
  { text: 'una cicatriz vieja', tier: 'media' },
  { text: 'un diario con candado', tier: 'media' },
  { text: 'una postal nunca enviada', tier: 'media' },
  { text: 'un trofeo cubierto de polvo', tier: 'media' },
  { text: 'una brújula que ya no apunta al norte', tier: 'media' },
  { text: 'un disco rayado', tier: 'media' },
  { text: 'una semilla en el bolsillo', tier: 'media' },
  { text: 'un nudo que no se deshace', tier: 'media' },
  { text: 'una hoja en blanco', tier: 'media' },
  { text: 'un reloj de arena vacío', tier: 'alta' },
  { text: 'una jaula con la puerta abierta', tier: 'alta' },
  { text: 'un hilo que conecta dos manos', tier: 'alta' },
  { text: 'un ancla sin barco', tier: 'alta' },
  { text: 'una máscara de cartón', tier: 'alta' },
  { text: 'un faro sin luz', tier: 'alta' },
  { text: 'una sombra que no encaja', tier: 'alta' },
  { text: 'un eco guardado en una caja', tier: 'alta' },
  { text: 'una moneda con dos caras iguales', tier: 'alta' },
  { text: 'un reloj que corre al revés', tier: 'alta' },
];

// ── emocion: emotions / inner states (~40) ───────────────────────
const EMOCION: BankEntry[] = [
  { text: 'nostalgia' },
  { text: 'rabia contenida' },
  { text: 'envidia' },
  { text: 'esperanza' },
  { text: 'orgullo' },
  { text: 'miedo' },
  { text: 'alegría' },
  { text: 'tristeza' },
  { text: 'soledad' },
  { text: 'gratitud' },
  { text: 'celos' },
  { text: 'culpa' },
  { text: 'valentía' },
  { text: 'frustración' },
  { text: 'calma' },
  { text: 'euforia' },
  { text: 'ternura' },
  { text: 'desconfianza' },
  { text: 'ansiedad' },
  { text: 'ilusión' },
  { text: 'vergüenza' },
  { text: 'rencor', tier: 'media' },
  { text: 'melancolía', tier: 'media' },
  { text: 'añoranza', tier: 'media' },
  { text: 'impotencia', tier: 'media' },
  { text: 'serenidad', tier: 'media' },
  { text: 'asombro', tier: 'media' },
  { text: 'desencanto', tier: 'media' },
  { text: 'alivio', tier: 'media' },
  { text: 'indiferencia', tier: 'media' },
  { text: 'resignación', tier: 'alta' },
  { text: 'incertidumbre', tier: 'alta' },
  { text: 'vértigo emocional', tier: 'alta' },
  { text: 'esperanza rota', tier: 'alta' },
  { text: 'orgullo herido', tier: 'alta' },
  { text: 'nostalgia de algo que no pasó', tier: 'alta' },
  { text: 'la calma antes de la tormenta', tier: 'alta' },
  { text: 'amor no correspondido', tier: 'alta' },
  { text: 'el vacío después de ganar', tier: 'alta' },
  { text: 'paz con el pasado', tier: 'alta' },
];

// ── lugar: places (~40) ──────────────────────────────────────────
const LUGAR: BankEntry[] = [
  { text: 'un andén vacío' },
  { text: 'la azotea del barrio' },
  { text: 'una cárcel' },
  { text: 'la plaza de noche' },
  { text: 'una cancha de básquet' },
  { text: 'la parada del autobús' },
  { text: 'un parque al amanecer' },
  { text: 'una estación de tren' },
  { text: 'un callejón sin salida' },
  { text: 'la cocina de la abuela' },
  { text: 'un metro a medianoche' },
  { text: 'una playa en invierno' },
  { text: 'el último piso de un edificio' },
  { text: 'una sala de espera' },
  { text: 'un mercado al mediodía' },
  { text: 'una biblioteca silenciosa' },
  { text: 'un puente sobre el río' },
  { text: 'una esquina del barrio' },
  { text: 'un bar casi vacío' },
  { text: 'una habitación de hotel' },
  { text: 'un campo de fútbol abandonado' },
  { text: 'una iglesia vieja' },
  { text: 'un faro junto al mar' },
  { text: 'una carretera de noche' },
  { text: 'un patio de colegio' },
  { text: 'una feria al cerrar' },
  { text: 'un ascensor detenido' },
  { text: 'una terraza bajo la lluvia' },
  { text: 'el fondo de una mina', tier: 'media' },
  { text: 'una ciudad fantasma', tier: 'media' },
  { text: 'un desierto al atardecer', tier: 'media' },
  { text: 'una frontera', tier: 'media' },
  { text: 'el cruce de dos caminos', tier: 'media' },
  { text: 'una casa en ruinas', tier: 'media' },
  { text: 'un cementerio en silencio', tier: 'alta' },
  { text: 'un laberinto sin centro', tier: 'alta' },
  { text: 'el borde de un acantilado', tier: 'alta' },
  { text: 'una isla sin nombre', tier: 'alta' },
  { text: 'el lugar donde todo empezó', tier: 'alta' },
  { text: 'la línea entre el sueño y la vigilia', tier: 'alta' },
];

// ── situacion: scenes / scenarios (~40) ──────────────────────────
const SITUACION: BankEntry[] = [
  { text: 'perder la última batalla' },
  { text: 'volver al barrio después de años' },
  { text: 'una despedida en la estación' },
  { text: 'el primer día en un trabajo nuevo' },
  { text: 'mudarse a otra ciudad' },
  { text: 'reencontrarse con un viejo amigo' },
  { text: 'quedarse sin palabras en el escenario' },
  { text: 'recibir una llamada a medianoche' },
  { text: 'empezar de cero' },
  { text: 'ganar contra todo pronóstico' },
  { text: 'pedir perdón demasiado tarde' },
  { text: 'leer una carta del pasado' },
  { text: 'perder un tren por segundos' },
  { text: 'cumplir un sueño de la infancia' },
  { text: 'despertar en un lugar desconocido' },
  { text: 'cerrar un viejo capítulo' },
  { text: 'enfrentarse a un miedo' },
  { text: 'decir adiós sin mirar atrás' },
  { text: 'encontrar algo perdido hace años' },
  { text: 'una reconciliación inesperada' },
  { text: 'la noche antes de una decisión grande' },
  { text: 'caer y volver a levantarse' },
  { text: 'sostener la mirada a un rival' },
  { text: 'pasar la última prueba' },
  { text: 'romper una promesa' },
  { text: 'cuidar a alguien que se va' },
  { text: 'apostar todo en una sola jugada' },
  { text: 'esperar una respuesta que no llega' },
  { text: 'el regreso después de una larga ausencia', tier: 'media' },
  { text: 'descubrir una verdad escondida', tier: 'media' },
  { text: 'elegir entre dos caminos', tier: 'media' },
  { text: 'soltar lo que ya no sirve', tier: 'media' },
  { text: 'reconstruir lo que se rompió', tier: 'media' },
  { text: 'mirar atrás sin arrepentirse', tier: 'media' },
  { text: 'perdonar a quien hizo daño', tier: 'alta' },
  { text: 'reconocer un error en voz alta', tier: 'alta' },
  { text: 'renunciar a un sueño por otro', tier: 'alta' },
  { text: 'aceptar que el tiempo no vuelve', tier: 'alta' },
  { text: 'enfrentar al reflejo en el espejo', tier: 'alta' },
  { text: 'soltar el control y dejar ir', tier: 'alta' },
];

// ── tematica: themes (~40) ───────────────────────────────────────
const TEMATICA: BankEntry[] = [
  { text: 'el tiempo' },
  { text: 'la calle' },
  { text: 'los sueños rotos' },
  { text: 'la familia' },
  { text: 'la amistad' },
  { text: 'el dinero' },
  { text: 'la libertad' },
  { text: 'el amor' },
  { text: 'la lucha' },
  { text: 'el éxito' },
  { text: 'el barrio' },
  { text: 'la música' },
  { text: 'la memoria' },
  { text: 'los inicios' },
  { text: 'la noche' },
  { text: 'el viaje' },
  { text: 'la esperanza' },
  { text: 'la traición' },
  { text: 'el silencio' },
  { text: 'la rutina' },
  { text: 'las raíces' },
  { text: 'la distancia' },
  { text: 'el cambio' },
  { text: 'la verdad' },
  { text: 'el futuro' },
  { text: 'el pasado' },
  { text: 'la madurez', tier: 'media' },
  { text: 'la identidad', tier: 'media' },
  { text: 'el destino', tier: 'media' },
  { text: 'el sacrificio', tier: 'media' },
  { text: 'la justicia', tier: 'media' },
  { text: 'el perdón', tier: 'media' },
  { text: 'la soledad elegida', tier: 'media' },
  { text: 'el sentido de pertenecer', tier: 'alta' },
  { text: 'el paso del tiempo', tier: 'alta' },
  { text: 'la dualidad entre luz y sombra', tier: 'alta' },
  { text: 'la herencia que se deja', tier: 'alta' },
  { text: 'el precio de los sueños', tier: 'alta' },
  { text: 'la búsqueda de un lugar propio', tier: 'alta' },
  { text: 'lo que queda cuando todo cambia', tier: 'alta' },
];

const BANKS: Record<Exclude<PromptKind, 'palabras'>, BankEntry[]> = {
  objeto: OBJETO,
  emocion: EMOCION,
  lugar: LUGAR,
  situacion: SITUACION,
  tematica: TEMATICA,
};

// ── randomness (app runtime; Math.random is fine here) ───────────
const randInt = (n: number): number => Math.floor(Math.random() * n);

const pickOne = <T>(arr: readonly T[]): T => arr[randInt(arr.length)];

// Shuffle a copy (Fisher-Yates) so getPrompts returns distinct entries.
const shuffled = <T>(arr: readonly T[]): T[] => {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

// Entries eligible for a given difficulty. Defaults to the full bank
// (avanzado-style breadth) when no difficulty is supplied.
function poolFor(kind: Exclude<PromptKind, 'palabras'>, difficulty?: Difficulty): BankEntry[] {
  const bank = BANKS[kind];
  if (!difficulty) return bank;
  const allowed = TIERS_FOR_DIFFICULTY[difficulty];
  const filtered = bank.filter((e) => allowed.includes(tierOf(e)));
  // Safety net: never hand back an empty pool.
  return filtered.length > 0 ? filtered : bank;
}

const toCard = (kind: PromptKind, e: BankEntry): PromptCard => ({
  kind,
  text: e.text,
  ...(e.hint ? { hint: e.hint } : {}),
});

/**
 * Return one random card of the given kind.
 *
 * 'palabras' has no banner card, so it returns an empty-text card; callers
 * normally branch on kind before calling, but this stays safe.
 *
 * `difficulty` biases toward more abstract entries at higher levels: a
 * 'principiante' only sees concrete dejas, an 'experto' can draw from the
 * whole bank including the abstract tier.
 */
export function getPrompt(kind: PromptKind, difficulty?: Difficulty): PromptCard {
  if (kind === 'palabras') return { kind: 'palabras', text: '' };
  return toCard(kind, pickOne(poolFor(kind, difficulty)));
}

/**
 * Return up to `n` distinct random cards of the given kind. If `n` exceeds
 * the bank size, returns the whole (shuffled) bank. Returns an empty array
 * for 'palabras' or non-positive `n`.
 */
export function getPrompts(kind: PromptKind, n: number, difficulty?: Difficulty): PromptCard[] {
  if (kind === 'palabras' || n <= 0) return [];
  const pool = poolFor(kind, difficulty);
  return shuffled(pool)
    .slice(0, Math.min(n, pool.length))
    .map((e) => toCard(kind, e));
}
