"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../components/ui/Header";
import { HowToPlayModal } from "../components/modals/HowToPlayModal";
import { Toast } from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";
import { isValidWord } from "../lib/wordValidation";
import { encodeWord } from "../lib/encoder";

export default function HomePage() {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const { message, isVisible, showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedWord = word.trim().toLowerCase();

    if (trimmedWord.length !== 5) {
      showToast("Word must be 5 letters");
      return;
    }

    if (!isValidWord(trimmedWord)) {
      showToast("Not a valid word");
      return;
    }

    // Generate the shareable link
    const encoded = encodeWord(trimmedWord);
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const link = `${baseUrl}/play?w=${encoded}`;
    setGeneratedLink(link);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      showToast("Copied to clipboard!");
    } catch {
      showToast("Failed to copy");
    }
  };

  const handlePlayYourself = () => {
    const encoded = encodeWord(word.trim().toLowerCase());
    router.push(`/play?w=${encoded}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onHelpClick={() => setShowHowToPlay(true)} />

      <main className="flex-1 flex flex-col items-center justify-center p-3 xs:p-4">
        <div className="max-w-md w-full space-y-6 xs:space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl xs:text-3xl font-bold">Create Your Puzzle</h2>
            <p className="text-wordle-gray text-sm xs:text-base">
              Enter a 5-letter word for your friends to guess
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value.slice(0, 5))}
                placeholder="Enter word..."
                className="w-full px-3 xs:px-4 py-2.5 xs:py-3 text-xl xs:text-2xl text-center font-bold uppercase tracking-widest border-2 border-wordle-border rounded focus:outline-none focus:border-wordle-dark-gray"
                maxLength={5}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-wordle-green text-white font-bold rounded hover:opacity-90 transition-opacity"
            >
              Generate Link
            </button>
          </form>

          {generatedLink && (
            <div className="space-y-4 p-4 border border-wordle-border rounded-lg">
              <p className="text-sm text-center font-medium">
                Share this link with your friends:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm text-black border border-wordle-border rounded bg-gray-50 truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-wordle-dark-gray text-white font-bold rounded hover:opacity-90 transition-opacity"
                >
                  Copy
                </button>
              </div>
              <button
                onClick={handlePlayYourself}
                className="w-full py-2 text-sm text-wordle-gray hover:text-foreground transition-colors"
              >
                Or play it yourself
              </button>
            </div>
          )}
        </div>
      </main>

      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />

      <Toast message={message} isVisible={isVisible} />
    </div>
  );
}
