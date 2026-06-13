import { Word } from './types';

// Spanish vowels (including accented)
const VOWELS = 'aeiouáéíóú';
const ACCENT_MAP: Record<string, string> = {
  á: 'a',
  é: 'e',
  í: 'i',
  ó: 'o',
  ú: 'u',
  ü: 'u',
};

function isVowel(ch: string): boolean {
  return VOWELS.includes(ch.toLowerCase());
}

function hasAccent(ch: string): boolean {
  return 'áéíóú'.includes(ch.toLowerCase());
}

function stripAccent(ch: string): string {
  return ACCENT_MAP[ch.toLowerCase()] ?? ch.toLowerCase();
}

/**
 * Normalize Spanish phonetics for comparison (Latin American).
 * - b/v → b
 * - c before e/i → s
 * - g before e/i → j
 * - h → (silent, removed)
 * - ll → y
 * - qu → k
 * - z → s
 * - ñ stays ñ
 * - rr stays rr
 */
function normalizePhonetic(text: string): string {
  let result = '';
  const lower = text.toLowerCase();

  for (let i = 0; i < lower.length; i++) {
    const ch = lower[i];
    const next = lower[i + 1] ?? '';

    // ll → y
    if (ch === 'l' && next === 'l') {
      result += 'y';
      i++;
      continue;
    }

    // qu → k
    if (ch === 'q' && next === 'u') {
      result += 'k';
      i++;
      continue;
    }

    // rr stays rr
    if (ch === 'r' && next === 'r') {
      result += 'rr';
      i++;
      continue;
    }

    // h is silent
    if (ch === 'h') {
      continue;
    }

    // v → b
    if (ch === 'v') {
      result += 'b';
      continue;
    }

    // c before e/i → s; otherwise c → k
    if (ch === 'c') {
      if (next === 'e' || next === 'i' || next === 'é' || next === 'í') {
        result += 's';
      } else if (next === 'h') {
        result += 'ch';
        i++;
      } else {
        result += 'k';
      }
      continue;
    }

    // g before e/i → j
    if (ch === 'g') {
      if (next === 'e' || next === 'i' || next === 'é' || next === 'í') {
        result += 'j';
      } else if (next === 'u') {
        // gu before e/i → g (the u is silent), otherwise gu
        const afterU = lower[i + 2] ?? '';
        if (
          afterU === 'e' ||
          afterU === 'i' ||
          afterU === 'é' ||
          afterU === 'í'
        ) {
          result += 'g';
          i++; // skip u
        } else {
          result += 'g';
        }
      } else {
        result += 'g';
      }
      continue;
    }

    // z → s (Latin American seseo)
    if (ch === 'z') {
      result += 's';
      continue;
    }

    // x → ks
    if (ch === 'x') {
      result += 'ks';
      continue;
    }

    // strip accents from vowels for phonetic normalization
    if (ACCENT_MAP[ch]) {
      result += ACCENT_MAP[ch];
      continue;
    }

    result += ch;
  }

  return result;
}

/**
 * Find the index of the stressed vowel in a Spanish word.
 * Returns the index in the original (lowercased) string.
 */
function findStressedVowelIndex(word: string): number {
  const lower = word.toLowerCase();

  // 1. Explicit accent mark overrides everything
  for (let i = 0; i < lower.length; i++) {
    if (hasAccent(lower[i])) {
      return i;
    }
  }

  // Collect vowel positions (treating diphthongs appropriately)
  const vowelPositions: number[] = [];
  for (let i = 0; i < lower.length; i++) {
    if (isVowel(lower[i])) {
      vowelPositions.push(i);
    }
  }

  if (vowelPositions.length === 0) return lower.length - 1;
  if (vowelPositions.length === 1) return vowelPositions[0];

  // Group vowels into syllable nuclei (handle diphthongs)
  // Strong vowels: a, e, o
  // Weak vowels: i, u
  // Two strong vowels = hiatus (separate syllables)
  // Strong + weak or weak + weak = diphthong (same syllable)
  const syllableNuclei: number[] = []; // index of the "main" vowel per syllable
  let i = 0;
  while (i < vowelPositions.length) {
    const pos = vowelPositions[i];
    const ch = stripAccent(lower[pos]);
    const isStrong = 'aeo'.includes(ch);

    // Check if next vowel is adjacent and forms a diphthong
    if (i + 1 < vowelPositions.length) {
      const nextPos = vowelPositions[i + 1];
      const nextCh = stripAccent(lower[nextPos]);
      const nextIsStrong = 'aeo'.includes(nextCh);

      // Adjacent vowels?
      if (nextPos === pos + 1) {
        if (isStrong && nextIsStrong) {
          // Hiatus: two separate syllables
          syllableNuclei.push(pos);
          i++;
          continue;
        }
        // Diphthong: count as one syllable
        // The strong vowel is the nucleus, or the second if both weak
        if (isStrong) {
          syllableNuclei.push(pos);
        } else if (nextIsStrong) {
          syllableNuclei.push(nextPos);
        } else {
          // Two weak vowels: second is nucleus
          syllableNuclei.push(nextPos);
        }
        i += 2;
        continue;
      }
    }

    syllableNuclei.push(pos);
    i++;
  }

  if (syllableNuclei.length === 0) return lower.length - 1;
  if (syllableNuclei.length === 1) return syllableNuclei[0];

  // 2. Apply Spanish stress rules based on final character
  const lastChar = lower[lower.length - 1];
  const endsInVowelNS =
    isVowel(lastChar) || lastChar === 'n' || lastChar === 's';

  if (endsInVowelNS) {
    // Stress on penultimate syllable (palabra llana)
    return syllableNuclei[syllableNuclei.length - 2] ?? syllableNuclei[0];
  } else {
    // Stress on last syllable (palabra aguda)
    return syllableNuclei[syllableNuclei.length - 1];
  }
}

/**
 * Extract the consonant rhyme ending from a Spanish word.
 * Everything from the last stressed vowel to the end.
 */
export function extractRhymeEnding(word: string): string {
  const lower = word.toLowerCase().trim();
  if (lower.length === 0) return '';

  const stressIdx = findStressedVowelIndex(lower);

  // Extract from the stressed vowel to the end
  let ending = lower.slice(stressIdx);

  // Normalize: strip accents in the ending
  ending = ending
    .split('')
    .map((ch) => ACCENT_MAP[ch] ?? ch)
    .join('');

  return ending;
}

/**
 * Extract the vowel-only pattern from the rhyme ending.
 * Returns vowels separated by hyphens.
 * "alma" → "a-a", "vida" → "i-a", "fuego" → "e-o"
 */
export function extractAssonantPattern(word: string): string {
  const ending = extractRhymeEnding(word);

  const vowels: string[] = [];
  for (const ch of ending) {
    const normalized = stripAccent(ch);
    if ('aeiou'.includes(normalized)) {
      vowels.push(normalized);
    }
  }

  return vowels.join('-');
}

/**
 * Normalize a rhyme ending for phonetic comparison.
 */
function normalizeEnding(ending: string): string {
  return normalizePhonetic(ending);
}

/**
 * Check if two words have consonant rhyme (rima consonante).
 */
function isConsonantRhyme(word1: string, word2: string): boolean {
  const e1 = normalizeEnding(extractRhymeEnding(word1));
  const e2 = normalizeEnding(extractRhymeEnding(word2));
  return e1 === e2 && e1.length > 0;
}

/**
 * Check if two words have assonant rhyme (rima asonante).
 */
function isAssonantRhyme(word1: string, word2: string): boolean {
  const p1 = extractAssonantPattern(word1);
  const p2 = extractAssonantPattern(word2);
  return p1 === p2 && p1.length > 0;
}

/**
 * Find all words in a word bank that rhyme with the given word.
 */
export function findRhymes(
  word: string,
  wordBank: Word[],
  type: 'consonante' | 'asonante' | 'ambas'
): Word[] {
  const lower = word.toLowerCase().trim();

  return wordBank.filter((w) => {
    const wLower = w.text.toLowerCase().trim();
    if (wLower === lower) return false; // Don't match self

    switch (type) {
      case 'consonante':
        return isConsonantRhyme(lower, wLower);
      case 'asonante':
        return isAssonantRhyme(lower, wLower) && !isConsonantRhyme(lower, wLower);
      case 'ambas':
        return isConsonantRhyme(lower, wLower) || isAssonantRhyme(lower, wLower);
    }
  });
}

/**
 * Group words by their rhyme ending.
 * For consonante: groups by the normalized phonetic ending.
 * For asonante: groups by the vowel pattern.
 */
export function groupByRhyme(
  words: Word[],
  type: 'consonante' | 'asonante'
): Map<string, Word[]> {
  const groups = new Map<string, Word[]>();

  for (const word of words) {
    const key =
      type === 'consonante'
        ? normalizeEnding(extractRhymeEnding(word.text))
        : extractAssonantPattern(word.text);

    if (!key) continue;

    const group = groups.get(key);
    if (group) {
      group.push(word);
    } else {
      groups.set(key, [word]);
    }
  }

  return groups;
}

/**
 * Rate how well two words rhyme on a 0-1 scale.
 *
 * - 1.0  = perfect consonant rhyme
 * - 0.8  = consonant rhyme with phonetic normalization needed
 * - 0.5-0.7 = assonant rhyme (higher for more matching vowels)
 * - 0.0  = no rhyme
 *
 * Multi-syllable match bonus: longer matching endings score higher.
 */
export function getRhymeScore(word1: string, word2: string): number {
  const w1 = word1.toLowerCase().trim();
  const w2 = word2.toLowerCase().trim();

  if (w1 === w2) return 0; // Same word, no score

  const ending1Raw = extractRhymeEnding(w1);
  const ending2Raw = extractRhymeEnding(w2);
  const ending1 = normalizeEnding(ending1Raw);
  const ending2 = normalizeEnding(ending2Raw);

  // Perfect consonant rhyme
  if (ending1 === ending2 && ending1.length > 0) {
    // Bonus for longer rhyme endings (multi-syllable rhymes)
    const vowelCount = ending1Raw.split('').filter((c) => isVowel(c)).length;
    const multiSyllableBonus = Math.min((vowelCount - 1) * 0.05, 0.15);
    // Check if raw endings match exactly (no normalization needed)
    if (ending1Raw === ending2Raw) {
      return Math.min(1.0, 1.0 + multiSyllableBonus);
    }
    // Phonetic match (b/v, c/s, etc.)
    return Math.min(0.95, 0.8 + multiSyllableBonus);
  }

  // Assonant rhyme
  const pattern1 = extractAssonantPattern(w1);
  const pattern2 = extractAssonantPattern(w2);

  if (pattern1 === pattern2 && pattern1.length > 0) {
    const vowelCount = pattern1.split('-').length;

    // Base score: 0.5
    // More matching vowels = higher score
    const base = 0.5;
    const vowelBonus = Math.min((vowelCount - 1) * 0.1, 0.2);

    // Check for partial consonant overlap in ending
    let consonantOverlap = 0;
    const minLen = Math.min(ending1.length, ending2.length);
    for (let i = 0; i < minLen; i++) {
      const c1 = ending1[ending1.length - 1 - i];
      const c2 = ending2[ending2.length - 1 - i];
      if (c1 === c2) consonantOverlap++;
      else break;
    }
    const overlapBonus = Math.min(consonantOverlap * 0.05, 0.1);

    return Math.min(0.79, base + vowelBonus + overlapBonus);
  }

  // Check for partial vowel pattern match (tail match)
  const vowels1 = pattern1.split('-');
  const vowels2 = pattern2.split('-');
  let tailMatch = 0;
  const minVowels = Math.min(vowels1.length, vowels2.length);
  for (let i = 0; i < minVowels; i++) {
    if (
      vowels1[vowels1.length - 1 - i] === vowels2[vowels2.length - 1 - i]
    ) {
      tailMatch++;
    } else {
      break;
    }
  }

  if (tailMatch > 0 && minVowels > 0) {
    return Math.min(0.4, tailMatch * 0.15);
  }

  return 0;
}

// ─── Syllabification + multi-syllable rhyme keys ─────────────────
// Spanish syllabification rules — used to compute deep rhyme keys
// (e.g. "corazón" / "razón" share the last 2 syllables "ra-zón" → 2-syl rhyme).

const STRONG_VOWELS = 'aeoáéó';
const ACCENTED_WEAK = 'íúÍÚ';
const VALID_ONSET_CLUSTERS = new Set([
  'br', 'bl', 'cr', 'cl', 'dr', 'fr', 'fl', 'gr', 'gl', 'pr', 'pl', 'tr',
]);
const DIGRAPHS = new Set(['ch', 'll', 'rr']);

/**
 * Split a Spanish word into syllables. Best-effort — handles diphthongs,
 * hiatus, valid onset clusters, and digraphs (ch / ll / rr).
 */
export function syllabify(word: string): string[] {
  const w = word.toLowerCase();
  if (!w) return [];

  // Tokenize into alternating vowel / consonant clusters (treating diphthongs
  // as a single vowel cluster, hiatus as a break).
  type Tok = { type: 'V' | 'C'; s: string };
  const tokens: Tok[] = [];
  let i = 0;
  while (i < w.length) {
    if (isVowel(w[i])) {
      let v = w[i];
      i++;
      while (i < w.length && isVowel(w[i])) {
        const last = v[v.length - 1];
        const cur = w[i];
        const lastStrong = STRONG_VOWELS.includes(last);
        const curStrong = STRONG_VOWELS.includes(cur);
        const lastAccentedWeak = ACCENTED_WEAK.includes(last);
        const curAccentedWeak = ACCENTED_WEAK.includes(cur);
        // Hiatus: two strong vowels, or accented weak adjacent to strong
        if (lastStrong && curStrong) break;
        if (lastAccentedWeak || curAccentedWeak) break;
        v += cur;
        i++;
      }
      tokens.push({ type: 'V', s: v });
    } else {
      let c = '';
      while (i < w.length && !isVowel(w[i])) {
        c += w[i];
        i++;
      }
      tokens.push({ type: 'C', s: c });
    }
  }

  // Walk the tokens, building syllables (one V token per syllable).
  const syllables: string[] = [];
  let cur = '';
  for (let t = 0; t < tokens.length; t++) {
    const tk = tokens[t];
    if (tk.type === 'C') {
      cur += tk.s;
      continue;
    }
    cur += tk.s; // V token

    const nextC = tokens[t + 1];
    const hasMore = t + 2 < tokens.length;
    if (!nextC || nextC.type !== 'C') {
      syllables.push(cur);
      cur = '';
      continue;
    }
    if (!hasMore) {
      // Final consonants attach to current syllable
      cur += nextC.s;
      syllables.push(cur);
      cur = '';
      t++; // consume nextC
      continue;
    }

    // We have V + C-cluster + V — decide where to split the consonants.
    const cons = nextC.s;
    let take = 0; // chars of cons that stay with the current syllable's coda
    if (cons.length === 1) {
      take = 0;
    } else {
      const last2 = cons.slice(-2);
      if (DIGRAPHS.has(last2) || VALID_ONSET_CLUSTERS.has(last2)) {
        take = cons.length - 2;
      } else {
        take = cons.length - 1;
      }
    }
    cur += cons.slice(0, take);
    syllables.push(cur);
    cur = cons.slice(take);
    t++; // consume nextC
  }
  if (cur) {
    if (syllables.length > 0) syllables[syllables.length - 1] += cur;
    else syllables.push(cur);
  }
  return syllables;
}

/**
 * Compute a phonetically-normalised rhyme key from the last `depth` syllables.
 * Two words sharing this key rhyme at multi-syllable depth.
 *
 *   rhymeKey('corazón', 2) === rhymeKey('razón', 2)            // 'rason'
 *   rhymeKey('perfecto', 2) === rhymeKey('afecto', 2)          // 'fekto'
 *   rhymeKey('amor', 1)     === rhymeKey('dolor', 1)           // 'or'
 */
export function rhymeKey(word: string, depth: number): string {
  if (depth <= 0) return '';
  const syls = syllabify(word);
  if (syls.length === 0) return '';
  const slice = syls.slice(-Math.min(depth, syls.length)).join('');
  return normalizePhonetic(slice);
}

// ─── Tier-2 depth: syllable counts, consonante/asonante, near + compound ───
// New public surface. Nothing below changes the existing exports above; these
// only add capability used by the diccionario page.

/**
 * Count the syllables of a Spanish word with a solid heuristic
 * (diphthongs collapse, hiatus splits, accented weak vowels break).
 * Reuses `syllabify`, so it stays consistent with the rhyme keys.
 *
 *   countSyllables('corazón') === 3
 *   countSyllables('día')     === 2   // í-a hiatus
 *   countSyllables('fuego')   === 2   // ue diphthong
 */
export function countSyllables(word: string): number {
  const n = syllabify(word).length;
  return n > 0 ? n : 1;
}

/**
 * The "stressed-vowel tail" of a word: everything from the last stressed
 * vowel to the end, accents stripped. This is the segment a rhyme is judged
 * on. Exposed as a named helper (alias of `extractRhymeEnding`).
 *
 *   stressedTail('canción') === 'on'
 *   stressedTail('camino')  === 'ino'
 */
export function stressedTail(word: string): string {
  return extractRhymeEnding(word);
}

/**
 * Rima consonante: identical from the last stressed vowel, consonants
 * included (phonetically normalised, so b/v, c/s, ll/y, etc. count as equal).
 */
export function consonantRhyme(a: string, b: string): boolean {
  return isConsonantRhyme(a.toLowerCase().trim(), b.toLowerCase().trim());
}

/**
 * Rima asonante: only the vowels from the last stressed vowel match. Every
 * consonante rhyme is also asonante; use `nearRhymes` for the asonante-only set.
 */
export function asonantRhyme(a: string, b: string): boolean {
  return isAssonantRhyme(a.toLowerCase().trim(), b.toLowerCase().trim());
}

type WordOrText = string | Word;

function asText(x: WordOrText): string {
  return typeof x === 'string' ? x : x.text;
}

/**
 * The "near rhymes" of a word among a candidate list.
 *
 * - type 'asonante' (default): words that rhyme asonante but NOT consonante —
 *   i.e. the imperfect / vowel-only rhymes a freestyler can reach for.
 * - type 'consonante': words that rhyme consonante (the perfect ones).
 *
 * Accepts plain strings or Word objects; always returns the matching words'
 * text.
 */
export function nearRhymes(
  word: string,
  candidates: WordOrText[],
  type: 'asonante' | 'consonante' = 'asonante'
): string[] {
  const w = word.toLowerCase().trim();
  if (!w) return [];

  const out: string[] = [];
  for (const c of candidates) {
    const text = asText(c);
    const t = text.toLowerCase().trim();
    if (t === w) continue;

    if (type === 'consonante') {
      if (isConsonantRhyme(w, t)) out.push(text);
    } else if (isAssonantRhyme(w, t) && !isConsonantRhyme(w, t)) {
      out.push(text);
    }
  }
  return out;
}

// Dialect-neutral function words used as the lead of a compound rhyme. Kept
// to short, register-agnostic connectors so the generated phrases read
// naturally across Spanish variants (no possessive "tu", no tú/vos forms).
const COMPOUND_LEAD_WORDS = [
  'sin', 'con', 'por', 'más', 'ya', 'mi', 'le', 'lo', 'que', 'no', 'tan', 'su',
];

/**
 * Rimas compuestas: multi-word combos whose joined ending rhymes with `word`.
 *
 * v1 is intentionally simple. It pairs a short, dialect-neutral lead word
 * (sin / con / por / más / ...) with a single dictionary word that rhymes
 * consonante with the target, producing two-word endings such as
 * "sin razón", "con pasión", "por millón" for "corazón". Richer single-word
 * rhymes are preferred first (deeper shared tail ranks higher).
 *
 * LIMITATION: it does not phonetically re-segment the target across an
 * arbitrary boundary (e.g. splitting "corazón" into "cora" + "zón"); the
 * rhyme is always carried by the final dictionary word, with the lead word
 * supplying the multi-word feel. Results are capped.
 */
export function compoundRhymes(
  word: string,
  dictionary: WordOrText[],
  cap = 10
): string[] {
  const w = word.toLowerCase().trim();
  if (!w) return [];

  const targetEnding = normalizeEnding(extractRhymeEnding(w));
  if (!targetEnding) return [];

  // Single-word consonante rhymes, richest (deepest shared tail) first.
  const rhymes = dictionary
    .map(asText)
    .filter((t) => {
      const tl = t.toLowerCase().trim();
      return tl !== w && isConsonantRhyme(w, tl);
    })
    .sort((a, b) => getRhymeScore(w, b) - getRhymeScore(w, a));

  const out: string[] = [];
  const seen = new Set<string>();
  let leadIdx = 0;

  for (const r of rhymes) {
    const lead = COMPOUND_LEAD_WORDS[leadIdx % COMPOUND_LEAD_WORDS.length];
    leadIdx++;

    // Confirm the concatenated tail still rhymes with the target.
    const joinedEnding = normalizeEnding(extractRhymeEnding(lead + r));
    if (joinedEnding !== targetEnding) continue;

    const phrase = `${lead} ${r}`;
    if (seen.has(phrase)) continue;
    seen.add(phrase);
    out.push(phrase);
    if (out.length >= cap) break;
  }

  return out;
}

/**
 * Get N random words from the word bank that match a given rhyme ending.
 */
export function suggestRhymes(
  ending: string,
  count: number,
  wordBank: Word[]
): Word[] {
  const normalizedTarget = normalizeEnding(ending.toLowerCase());

  const matches = wordBank.filter((w) => {
    const wordEnding = normalizeEnding(extractRhymeEnding(w.text));
    return wordEnding === normalizedTarget;
  });

  // Shuffle and take N
  const shuffled = [...matches];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
