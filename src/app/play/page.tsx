"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "../../components/ui/Header";
import { GameBoard } from "../../components/game/GameBoard";
import { Keyboard } from "../../components/game/Keyboard";
import { HowToPlayModal } from "../../components/modals/HowToPlayModal";
import { GameOverModal } from "../../components/modals/GameOverModal";
import { Toast } from "../../components/ui/Toast";
import { useWordle } from "../../hooks/useWordle";
import { useToast } from "../../hooks/useToast";
import { decodeWord } from "../../lib/encoder";
import { isValidWord } from "../../lib/wordValidation";

export default function PlayPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [targetWord, setTargetWord] = useState<string | null>(null);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const { message, isVisible, showToast } = useToast();

  // Decode word from URL
  useEffect(() => {
    const encoded = searchParams.get("w");
    if (!encoded) {
      router.push("/");
      return;
    }

    const decoded = decodeWord(encoded);
    if (!decoded || decoded.length !== 5 || !isValidWord(decoded)) {
      showToast("Invalid puzzle link");
      setTimeout(() => router.push("/"), 1500);
      return;
    }

    setTargetWord(decoded.toUpperCase());
  }, [searchParams, router, showToast]);

  // Don't render game until we have a valid word
  if (!targetWord) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading puzzle...</p>
      </div>
    );
  }

  return (
    <GameContent
      targetWord={targetWord}
      showHowToPlay={showHowToPlay}
      setShowHowToPlay={setShowHowToPlay}
      showGameOver={showGameOver}
      setShowGameOver={setShowGameOver}
      message={message}
      isVisible={isVisible}
      showToast={showToast}
    />
  );
}

interface GameContentProps {
  targetWord: string;
  showHowToPlay: boolean;
  setShowHowToPlay: (show: boolean) => void;
  showGameOver: boolean;
  setShowGameOver: (show: boolean) => void;
  message: string;
  isVisible: boolean;
  showToast: (msg: string, duration?: number) => void;
}

function GameContent({
  targetWord,
  showHowToPlay,
  setShowHowToPlay,
  showGameOver,
  setShowGameOver,
  message,
  isVisible,
  showToast,
}: GameContentProps) {
  const router = useRouter();
  const { gameState, isRevealing, isShaking, handleKeyPress } =
    useWordle(targetWord);

  // Show game over modal when game ends
  useEffect(() => {
    if (gameState.gameStatus !== "playing" && !isRevealing) {
      const timer = setTimeout(() => {
        setShowGameOver(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState.gameStatus, isRevealing, setShowGameOver]);

  const handleShare = async () => {
    const guessCount = gameState.currentRow + (gameState.gameStatus === "won" ? 0 : 1);
    const won = gameState.gameStatus === "won";

    // Build emoji grid
    const emojiGrid = gameState.guesses
      .slice(0, guessCount)
      .map((row) =>
        row
          .map((tile) => {
            if (tile.state === "correct") return "🟩";
            if (tile.state === "present") return "🟨";
            return "⬛";
          })
          .join("")
      )
      .join("\n");

    const shareText = `Custom Wordle ${won ? guessCount : "X"}/6\n\n${emojiGrid}\n\nPlay this puzzle: ${window.location.href}`;

    try {
      if (navigator.share) {
        await navigator.share({ text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        showToast("Copied to clipboard!");
      }
    } catch {
      // User cancelled share
    }
  };

  const handleNewGame = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onHelpClick={() => setShowHowToPlay(true)} />

      <main className="flex-1 flex flex-col items-center justify-between py-4">
        <div className="flex-1 flex items-center">
          <GameBoard
            guesses={gameState.guesses}
            currentGuess={gameState.currentGuess}
            currentRow={gameState.currentRow}
            isRevealing={isRevealing}
            isShaking={isShaking}
          />
        </div>

        <Keyboard
          usedKeys={gameState.usedKeys}
          onKeyPress={handleKeyPress}
        />
      </main>

      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />

      <GameOverModal
        isOpen={showGameOver}
        onClose={() => setShowGameOver(false)}
        gameStatus={gameState.gameStatus}
        targetWord={targetWord}
        guessCount={gameState.currentRow + (gameState.gameStatus === "won" ? 0 : 1)}
        onShare={handleShare}
        onNewGame={handleNewGame}
      />

      <Toast message={message} isVisible={isVisible} />
    </div>
  );
}
