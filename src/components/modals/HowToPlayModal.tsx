"use client";

import { Modal } from "../../components/ui/Modal";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How To Play">
      <div className="space-y-4 text-sm">
        <p>Guess the word in 6 tries.</p>

        <ul className="list-disc list-inside space-y-2">
          <li>Each guess must be a valid 5-letter word.</li>
          <li>
            The color of the tiles will change to show how close your guess was.
          </li>
        </ul>

        <div className="border-t border-wordle-border pt-4 space-y-3">
          <p className="font-bold">Examples</p>

          <div className="flex gap-1">
            <div className="tile tile-correct w-10 h-10 text-lg">W</div>
            <div className="tile tile-filled w-10 h-10 text-lg">E</div>
            <div className="tile tile-filled w-10 h-10 text-lg">A</div>
            <div className="tile tile-filled w-10 h-10 text-lg">R</div>
            <div className="tile tile-filled w-10 h-10 text-lg">Y</div>
          </div>
          <p>
            <strong>W</strong> is in the word and in the correct spot.
          </p>

          <div className="flex gap-1">
            <div className="tile tile-filled w-10 h-10 text-lg">P</div>
            <div className="tile tile-present w-10 h-10 text-lg">I</div>
            <div className="tile tile-filled w-10 h-10 text-lg">L</div>
            <div className="tile tile-filled w-10 h-10 text-lg">L</div>
            <div className="tile tile-filled w-10 h-10 text-lg">S</div>
          </div>
          <p>
            <strong>I</strong> is in the word but in the wrong spot.
          </p>

          <div className="flex gap-1">
            <div className="tile tile-filled w-10 h-10 text-lg">V</div>
            <div className="tile tile-filled w-10 h-10 text-lg">A</div>
            <div className="tile tile-filled w-10 h-10 text-lg">G</div>
            <div className="tile tile-absent w-10 h-10 text-lg">U</div>
            <div className="tile tile-filled w-10 h-10 text-lg">E</div>
          </div>
          <p>
            <strong>U</strong> is not in the word in any spot.
          </p>
        </div>
      </div>
    </Modal>
  );
}
