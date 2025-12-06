import { LetterState } from "../../lib/gameLogic";

interface TileProps {
  letter: string;
  state: LetterState;
  position?: number;
  isRevealing?: boolean;
}

export function Tile({
  letter,
  state,
  position = 0,
  isRevealing = false,
}: TileProps) {
  const stateClasses: Record<LetterState, string> = {
    correct: "tile-correct",
    present: "tile-present",
    absent: "tile-absent",
    empty: "",
    tbd: "tile-filled",
  };

  const animationDelay = isRevealing ? `${position * 300}ms` : "0ms";

  return (
    <div
      className={`tile ${letter ? "tile-filled" : ""} ${stateClasses[state]} ${
        isRevealing ? "animate-flip" : ""
      }`}
      style={{ animationDelay }}
    >
      {letter}
    </div>
  );
}
