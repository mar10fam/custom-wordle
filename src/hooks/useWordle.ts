"use client";

import { useState, useCallback, useEffect } from "react";
import {
  GameState,
  GameStatus,
  TileState,
  LetterState,
  createInitialGameState,
  evaluateGuess,
  updateUsedKeys,
  MAX_GUESSES,
  WORD_LENGTH,
} from "../lib/gameLogic";
import { isValidWord } from "../lib/wordValidation";

interface UseWordleReturn {
  gameState: GameState;
  isRevealing: boolean;
  isShaking: boolean;
  handleKeyPress: (key: string) => void;
  resetGame: (newWord?: string) => void;
}

export function useWordle(targetWord: string): UseWordleReturn {
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialGameState(targetWord)
  );
  const [isRevealing, setIsRevealing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Reset game when target word changes
  useEffect(() => {
    setGameState(createInitialGameState(targetWord));
  }, [targetWord]);

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, []);

  const submitGuess = useCallback(() => {
    const { currentGuess, currentRow, targetWord, guesses, usedKeys } =
      gameState;

    // Validate guess length
    if (currentGuess.length !== WORD_LENGTH) {
      triggerShake();
      return { success: false, message: "Not enough letters" };
    }

    // Validate word exists
    if (!isValidWord(currentGuess)) {
      triggerShake();
      return { success: false, message: "Not in word list" };
    }

    // Evaluate the guess
    const evaluation = evaluateGuess(currentGuess, targetWord);

    // Update guesses
    const newGuesses = [...guesses];
    newGuesses[currentRow] = evaluation;

    // Update used keys
    const newUsedKeys = updateUsedKeys(usedKeys, evaluation);

    // Check win/lose
    const isWin = currentGuess.toUpperCase() === targetWord.toUpperCase();
    const isLoss = !isWin && currentRow === MAX_GUESSES - 1;

    const newStatus: GameStatus = isWin
      ? "won"
      : isLoss
        ? "lost"
        : "playing";

    // Start reveal animation
    setIsRevealing(true);

    // Update state after animation
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        guesses: newGuesses,
        usedKeys: newUsedKeys,
        currentGuess: "",
        currentRow: isWin || isLoss ? prev.currentRow : prev.currentRow + 1,
        gameStatus: newStatus,
      }));
      setIsRevealing(false);
    }, WORD_LENGTH * 300 + 100);

    return { success: true };
  }, [gameState, triggerShake]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameState.gameStatus !== "playing" || isRevealing) return;

      if (key === "ENTER") {
        submitGuess();
        return;
      }

      if (key === "⌫" || key === "BACKSPACE") {
        setGameState((prev) => ({
          ...prev,
          currentGuess: prev.currentGuess.slice(0, -1),
        }));
        return;
      }

      // Add letter if valid and not at max length
      if (/^[A-Za-z]$/.test(key) && gameState.currentGuess.length < WORD_LENGTH) {
        setGameState((prev) => ({
          ...prev,
          currentGuess: prev.currentGuess + key.toUpperCase(),
        }));
      }
    },
    [gameState.gameStatus, gameState.currentGuess.length, isRevealing, submitGuess]
  );

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Enter") {
        handleKeyPress("ENTER");
      } else if (e.key === "Backspace") {
        handleKeyPress("⌫");
      } else if (/^[A-Za-z]$/.test(e.key)) {
        handleKeyPress(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  const resetGame = useCallback((newWord?: string) => {
    const word = newWord || targetWord;
    setGameState(createInitialGameState(word));
    setIsRevealing(false);
    setIsShaking(false);
  }, [targetWord]);

  return {
    gameState,
    isRevealing,
    isShaking,
    handleKeyPress,
    resetGame,
  };
}
