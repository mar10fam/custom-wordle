export type LetterState = "correct" | "present" | "absent" | "empty" | "tbd";

export type TileState = {
  letter: string;
  state: LetterState;
};

export type GameStatus = "playing" | "won" | "lost";

export interface GameState {
  targetWord: string;
  guesses: TileState[][];
  currentGuess: string;
  currentRow: number;
  gameStatus: GameStatus;
  usedKeys: Record<string, LetterState>;
}

export const MAX_GUESSES = 6;
export const WORD_LENGTH = 5;

export function createInitialGameState(targetWord: string): GameState {
  return {
    targetWord: targetWord.toUpperCase(),
    guesses: Array(MAX_GUESSES)
      .fill(null)
      .map(() =>
        Array(WORD_LENGTH)
          .fill(null)
          .map(() => ({ letter: "", state: "empty" as LetterState }))
      ),
    currentGuess: "",
    currentRow: 0,
    gameStatus: "playing",
    usedKeys: {},
  };
}

export function evaluateGuess(guess: string, target: string): TileState[] {
  const result: TileState[] = [];
  const targetLetters = target.split("");
  const guessLetters = guess.toUpperCase().split("");
  const targetCount: Record<string, number> = {};

  // Count letters in target
  for (const letter of targetLetters) {
    targetCount[letter] = (targetCount[letter] || 0) + 1;
  }

  // First pass: mark correct letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = { letter: guessLetters[i], state: "correct" };
      targetCount[guessLetters[i]]--;
    } else {
      result[i] = { letter: guessLetters[i], state: "absent" };
    }
  }

  // Second pass: mark present letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i].state !== "correct" && targetCount[guessLetters[i]] > 0) {
      result[i].state = "present";
      targetCount[guessLetters[i]]--;
    }
  }

  return result;
}

export function updateUsedKeys(
  usedKeys: Record<string, LetterState>,
  evaluation: TileState[]
): Record<string, LetterState> {
  const updated = { ...usedKeys };

  for (const tile of evaluation) {
    const current = updated[tile.letter];
    // Priority: correct > present > absent
    if (tile.state === "correct") {
      updated[tile.letter] = "correct";
    } else if (tile.state === "present" && current !== "correct") {
      updated[tile.letter] = "present";
    } else if (tile.state === "absent" && !current) {
      updated[tile.letter] = "absent";
    }
  }

  return updated;
}
