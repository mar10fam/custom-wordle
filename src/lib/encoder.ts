export function encodeWord(word: string): string {
  return Buffer.from(word.toLowerCase()).toString("base64url");
}

export function decodeWord(encoded: string): string {
  try {
    return Buffer.from(encoded, "base64url").toString("utf-8");
  } catch {
    return "";
  }
}