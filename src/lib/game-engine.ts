import type { Word, RhymeScheme, Difficulty, GameMode } from './types';
import { rhymeKey } from './rhyme-engine';

/**
 * Fisher-Yates shuffle (in-place, returns same array).
 */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Group words by a rhyme key derived from the last `depth` syllables.
 * Only returns groups that have at least `minSize` members.
 *   depth = 2 → multi-syllable rhymes (corazón / razón → 'rason')
 *   depth = 1 → traditional end-rhyme  (amor    / dolor → 'or')
 */
function groupByRhymeKey(
  words: Word[],
  depth: number,
  minSize: number,
): Map<string, Word[]> {
  const map = new Map<string, Word[]>();
  for (const w of words) {
    const key = rhymeKey(w.text, depth) || w.rhymeEnding.toLowerCase();
    if (!key) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(w);
  }
  for (const [key, group] of map) {
    if (group.length < minSize) map.delete(key);
  }
  return map;
}

/**
 * Multi-level group selector: prefer deep (multi-syllable) groups when the
 * vocabulary supports it, gracefully fall back to single-syllable end-rhymes
 * when not enough deep groups exist.
 */
function selectMultilevelGroups(
  words: Word[],
  numGroups: number,
  minPerGroup: number,
  used: Set<string>,
): Word[][] {
  const result: Word[][] = [];
  const usedTexts = new Set(used);

  // Pass 1 — multi-syllable (depth 2) groups
  const deep = groupByRhymeKey(words, 2, minPerGroup);
  const deepEligible: Word[][] = [];
  for (const g of deep.values()) {
    const avail = g.filter((w) => !usedTexts.has(w.text));
    if (avail.length >= minPerGroup) deepEligible.push(avail);
  }
  shuffle(deepEligible);
  while (result.length < numGroups && deepEligible.length > 0) {
    result.push(deepEligible.shift()!);
  }

  // Pass 2 — end-rhyme (depth 1) fallback
  if (result.length < numGroups) {
    const taken = new Set(result.flat().map((w) => w.text));
    const shallow = groupByRhymeKey(words, 1, minPerGroup);
    const shallowEligible: Word[][] = [];
    for (const g of shallow.values()) {
      const avail = g.filter(
        (w) => !usedTexts.has(w.text) && !taken.has(w.text),
      );
      if (avail.length >= minPerGroup) shallowEligible.push(avail);
    }
    shuffle(shallowEligible);
    while (result.length < numGroups && shallowEligible.length > 0) {
      result.push(shallowEligible.shift()!);
    }
  }
  return result;
}

/**
 * "Lazy rhyme": one word is literally the tail of the other (sandía/día,
 * corazón/razón). Rhyming a word with its own ending feels like cheating on
 * stage, so those pairs are never offered together.
 */
export function isLazyRhyme(a: Word, b: Word): boolean {
  const x = a.text.toLowerCase();
  const y = b.text.toLowerCase();
  if (x === y) return true;
  return x.endsWith(y) || y.endsWith(x);
}

/**
 * Pick `n` unique words from a group, excluding already-used texts.
 * Avoids lazy-rhyme pairs within the pick; falls back to plain picks if the
 * group is too small to satisfy the constraint — a lazy rhyme beats an
 * incomplete round.
 */
function pickFromGroup(group: Word[], n: number, used: Set<string>): Word[] {
  const available = group.filter((w) => !used.has(w.text));
  shuffle(available);
  const picked: Word[] = [];
  for (const w of available) {
    if (picked.length >= n) break;
    if (picked.some((p) => isLazyRhyme(p, w))) continue;
    picked.push(w);
  }
  for (const w of available) {
    if (picked.length >= n) break;
    if (!picked.includes(w)) picked.push(w);
  }
  return picked;
}


// ── Scheme builders ──────────────────────────────────────────────

/**
 * AABB: pairs of rhyming words → A,A,B,B,C,C...
 */
function buildAABB(words: Word[], count: number, used: Set<string>): Word[] {
  const pairsNeeded = Math.ceil(count / 2);
  
  const groups = selectMultilevelGroups(words, pairsNeeded, 2, used);
  const result: Word[] = [];

  for (const group of groups) {
    if (result.length >= count) break;
    const picked = pickFromGroup(group, 2, used);
    for (const w of picked) {
      if (result.length >= count) break;
      result.push(w);
      used.add(w.text);
    }
  }

  return result;
}

/**
 * ABAB: alternating rhyme groups → A,B,A,B,C,D,C,D...
 */
function buildABAB(words: Word[], count: number, used: Set<string>): Word[] {
  const quartetsNeeded = Math.ceil(count / 4);
  
  const groups = selectMultilevelGroups(words, quartetsNeeded * 2, 2, used);
  const result: Word[] = [];

  for (let i = 0; i + 1 < groups.length; i += 2) {
    if (result.length >= count) break;
    const groupA = pickFromGroup(groups[i], 2, used);
    const groupB = pickFromGroup(groups[i + 1], 2, used);

    // Interleave: A, B, A, B
    const maxLen = Math.max(groupA.length, groupB.length);
    for (let j = 0; j < maxLen; j++) {
      if (j < groupA.length && result.length < count) {
        result.push(groupA[j]);
        used.add(groupA[j].text);
      }
      if (j < groupB.length && result.length < count) {
        result.push(groupB[j]);
        used.add(groupB[j].text);
      }
    }
  }

  return result;
}

/**
 * ABBA: enclosed rhyme → A,B,B,A,C,D,D,C...
 */
function buildABBA(words: Word[], count: number, used: Set<string>): Word[] {
  const quartetsNeeded = Math.ceil(count / 4);
  
  const groups = selectMultilevelGroups(words, quartetsNeeded * 2, 2, used);
  const result: Word[] = [];

  for (let i = 0; i + 1 < groups.length; i += 2) {
    if (result.length >= count) break;
    const groupA = pickFromGroup(groups[i], 2, used);
    const groupB = pickFromGroup(groups[i + 1], 2, used);

    // Pattern: A, B, B, A
    if (groupA.length >= 2 && groupB.length >= 2) {
      result.push(groupA[0]);
      used.add(groupA[0].text);
      result.push(groupB[0]);
      used.add(groupB[0].text);
      if (result.length < count) {
        result.push(groupB[1]);
        used.add(groupB[1].text);
      }
      if (result.length < count) {
        result.push(groupA[1]);
        used.add(groupA[1].text);
      }
    }
  }

  return result;
}

/**
 * AAAA: same rhyme ending for 4 words in a row.
 */
function buildAAAA(words: Word[], count: number, used: Set<string>): Word[] {
  const quartetsNeeded = Math.ceil(count / 4);
  
  const groups = selectMultilevelGroups(words, quartetsNeeded, 4, used);
  const result: Word[] = [];

  for (const group of groups) {
    if (result.length >= count) break;
    const picked = pickFromGroup(group, 4, used);
    for (const w of picked) {
      if (result.length >= count) break;
      result.push(w);
      used.add(w.text);
    }
  }

  return result;
}

// ── Public API ───────────────────────────────────────────────────

/**
 * Build a sequence of words following the given rhyme scheme.
 */
function buildByScheme(
  words: Word[],
  scheme: RhymeScheme,
  count: number,
  used: Set<string>,
): Word[] {
  switch (scheme) {
    case 'AABB':
      return buildAABB(words, count, used);
    case 'ABAB':
      return buildABAB(words, count, used);
    case 'ABBA':
      return buildABBA(words, count, used);
    case 'AAAA':
      return buildAAAA(words, count, used);
    default:
      return buildAABB(words, count, used);
  }
}

/**
 * Generate a round of words arranged by the given rhyme scheme.
 * Words are selected from the pool, never repeating within a round.
 */
export function generateRound(
  words: Word[],
  scheme: RhymeScheme,
  count: number,
): Word[] {
  const used = new Set<string>();
  return buildByScheme(words, scheme, count, used);
}

/**
 * Generate the next batch of words for endless mode,
 * avoiding any word that has already been used this session.
 */
export function generateNextWords(
  words: Word[],
  scheme: RhymeScheme,
  count: number,
  usedWords: Set<string>,
): Word[] {
  // Clone so we don't mutate the caller's set until we succeed
  const used = new Set(usedWords);
  const result = buildByScheme(words, scheme, count, used);

  // If we couldn't fill enough (pool exhausted), reset used words and retry
  if (result.length < count) {
    const freshUsed = new Set<string>();
    return buildByScheme(words, scheme, count, freshUsed);
  }

  // Propagate newly used words back to caller
  for (const w of result) {
    usedWords.add(w.text);
  }

  return result;
}

/**
 * Calculate the score for a session.
 *
 * Base: 10 points per bar.
 * Difficulty multipliers:
 *   principiante 1x, intermedio 1.5x, avanzado 2x, experto 3x
 * Mode bonuses:
 *   clasico +0%, toque -20% (self-paced), barras-infinitas +25%, generador +10%
 */
export function calculateScore(
  barsCompleted: number,
  difficulty: Difficulty,
  mode: GameMode,
): number {
  const BASE_POINTS = 10;

  const difficultyMultiplier: Record<Difficulty, number> = {
    principiante: 1,
    intermedio: 1.5,
    avanzado: 2,
    experto: 3,
  };

  const modeMultiplier: Record<GameMode, number> = {
    clasico: 1,
    toque: 0.8,
    'barras-infinitas': 1.25,
    generador: 1.1,
  };

  return Math.round(
    barsCompleted * BASE_POINTS * difficultyMultiplier[difficulty] * modeMultiplier[mode],
  );
}
