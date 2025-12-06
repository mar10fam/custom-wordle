"use client";

import { LetterState } from "../../lib/gameLogic";
import { KEYBOARD_ROWS } from "../../lib/constants";
import { Key } from "./Key";

interface KeyboardProps {
  usedKeys: Record<string, LetterState>;
  onKeyPress: (key: string) => void;
}

export function Keyboard({ usedKeys, onKeyPress }: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 p-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5">
          {row.map((key) => (
            <Key
              key={key}
              value={key}
              state={usedKeys[key]}
              onClick={onKeyPress}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
