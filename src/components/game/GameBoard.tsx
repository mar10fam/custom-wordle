"use client";

import { TileState } from "../../lib/gameLogic";
import { Tile } from "./Tile";

interface GameBoardProps {
  guesses: TileState[][];
  currentGuess: string;
  currentRow: number;
  isRevealing: boolean;
  isShaking: boolean;
}

export function GameBoard({
  guesses,
  currentGuess,
  currentRow,
  isRevealing,
  isShaking,
}: GameBoardProps) {
  return (
    <div className="grid grid-rows-6 gap-1.5 p-2.5">
      {guesses.map((row, rowIndex) => {
        const isCurrentRow = rowIndex === currentRow;

        return (
          <div
            key={rowIndex}
            className={`grid grid-cols-5 gap-1.5 ${
              isCurrentRow && isShaking ? "animate-shake" : ""
            }`}
          >
            {row.map((tile, colIndex) => {
              // Show current guess letters in the active row
              const letter = isCurrentRow
                ? currentGuess[colIndex]?.toUpperCase() || ""
                : tile.letter;
              const state = isCurrentRow
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
                  isRevealing={isRevealing && rowIndex === currentRow - 1}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
