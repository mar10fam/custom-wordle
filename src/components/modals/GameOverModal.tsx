"use client";

import { Modal } from "../../components/ui/Modal";
import { GameStatus } from "../../lib/gameLogic";

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameStatus: GameStatus;
  targetWord: string;
  guessCount: number;
  onShare: () => void;
  onNewGame: () => void;
}

export function GameOverModal({
  isOpen,
  onClose,
  gameStatus,
  targetWord,
  guessCount,
  onShare,
  onNewGame,
}: GameOverModalProps) {
  const isWin = gameStatus === "won";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">
          {isWin ? "You Won!" : "Game Over"}
        </h2>

        {!isWin && (
          <p className="text-lg">
            The word was:{" "}
            <span className="font-bold uppercase">{targetWord}</span>
          </p>
        )}

        {isWin && (
          <p className="text-lg">
            You got it in <span className="font-bold">{guessCount}</span>{" "}
            {guessCount === 1 ? "guess" : "guesses"}!
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={onShare}
            className="px-6 py-3 bg-wordle-green text-white font-bold rounded hover:opacity-90 transition-opacity"
          >
            Share Result
          </button>
          <button
            onClick={onNewGame}
            className="px-6 py-3 bg-wordle-gray text-white font-bold rounded hover:opacity-90 transition-opacity"
          >
            Create New Word
          </button>
        </div>
      </div>
    </Modal>
  );
}
