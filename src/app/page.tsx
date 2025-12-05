import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Custom Wordle</h1>

      {/* Test the custom colors */}
      <div className="flex gap-2">
        <div className="tile tile-correct">W</div>
        <div className="tile tile-present">O</div>
        <div className="tile tile-absent">R</div>
        <div className="tile tile-correct">D</div>
        <div className="tile">S</div>
      </div>

      <p className="text-wordle-green">Green color works!</p>
      <p className="text-wordle-yellow">Yellow color works! </p>
    </main>
  );
}
