import { LetterState } from "../../lib/gameLogic";

interface KeyProps {
  value: string;
  state?: LetterState;
  onClick: (key: string) => void;
}

export function Key({ value, state, onClick }: KeyProps) {
  const isWide = value === "ENTER" || value === "⌫";

  const stateClasses: Record<string, string> = {
    correct: "key-correct",
    present: "key-present",
    absent: "key-absent",
  };

  return (
    <button
      className={`key ${isWide ? "key-wide" : ""} ${
        state ? stateClasses[state] : ""
      }`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}
