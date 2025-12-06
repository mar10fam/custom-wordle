import wordListRaw from "./wordList.txt";

const VALID_WORDS: Set<string> = new Set(
  wordListRaw
    .split("\n")
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length === 5)
);

export function isValidFormat(word: string): boolean {
  return /^[a-zA-Z]{5}$/.test(word);
}

export function isValidWord(word: string): boolean {
  if (!isValidFormat(word)) return false;
  return VALID_WORDS.has(word.toLowerCase());
}