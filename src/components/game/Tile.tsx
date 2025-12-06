"use client";

import { useState, useEffect } from "react";
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
  const [showState, setShowState] = useState(false);

  useEffect(() => {
    if (isRevealing) {
      // Delay showing the color until halfway through this tile's flip animation
      const delay = position * 300 + 250; // 250ms is halfway through 500ms flip
      const timer = setTimeout(() => {
        setShowState(true);
      }, delay);
      return () => clearTimeout(timer);
    } else if (state !== "empty" && state !== "tbd") {
      // Already revealed tiles should show their state
      setShowState(true);
    } else {
      setShowState(false);
    }
  }, [isRevealing, position, state]);

  const stateClasses: Record<LetterState, string> = {
    correct: "tile-correct",
    present: "tile-present",
    absent: "tile-absent",
    empty: "",
    tbd: "",
  };

  // Only show color state if revealed or not currently animating
  const displayState = isRevealing
    ? showState
      ? state
      : "tbd"
    : state;

  const animationDelay = isRevealing ? `${position * 300}ms` : "0ms";

  return (
    <div
      className={`tile ${letter ? "tile-filled" : ""} ${stateClasses[displayState]} ${
        isRevealing ? "animate-flip" : ""
      }`}
      style={{ animationDelay }}
    >
      {letter}
    </div>
  );
}
