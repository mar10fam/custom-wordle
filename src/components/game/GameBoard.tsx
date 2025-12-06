"use client";

import { TileState } from "../../lib/gameLogic";
import { Tile } from "./Tile";

interface GameBoardProps {
  guesses: TileState[][];
  currentGuess: string;
  currentRow: number;
  isRevealing: boolean;
  revealingRow: number;
  isShaking: boolean;
}

export function GameBoard({
  guesses,
  currentGuess,
  currentRow,
  isRevealing,
  revealingRow,
  isShaking,
}: GameBoardProps) {
  return (
    <div className="grid grid-rows-6 gap-1.5 p-2.5">
      {guesses.map((row, rowIndex) => {
        const isCurrentRow = rowIndex === currentRow;
        const isRowRevealing = isRevealing && rowIndex === revealingRow;

        return (
          <div
            key={rowIndex}
            className={`grid grid-cols-5 gap-1.5 ${
              isCurrentRow && isShaking ? "animate-shake" : ""
            }`}
          >
            {row.map((tile, colIndex) => {
              // Show current guess letters in the active row (only if not revealing)
              const showCurrentGuess = isCurrentRow && !isRowRevealing;
              const letter = showCurrentGuess
                ? currentGuess[colIndex]?.toUpperCase() || ""
                : tile.letter;
              const state = showCurrentGuess
                ? letter
                  ? "tbd"
                  : "empty"
                : tile.state;

              return (
                <Tile
                  key={colIndex}
                  letter={letter}
                  state={state}
                  position={colIndex}
                  isRevealing={isRowRevealing}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
