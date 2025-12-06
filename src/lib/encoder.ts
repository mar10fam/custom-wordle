export function encodeWord(word: string): string {
  // btoa for browser, then make URL-safe
  const base64 = btoa(word.toLowerCase());
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeWord(encoded: string): string {
  try {
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    // Add padding if needed
    while (base64.length % 4) {
      base64 += "=";
    }
    return atob(base64);
  } catch {
    return "";
  }
}