interface HeaderProps {
  onHelpClick?: () => void;
}

export function Header({ onHelpClick }: HeaderProps) {
  return (
    <header className="w-full border-b border-wordle-border flex-shrink-0">
      <div className="max-w-lg mx-auto px-2 xs:px-4 py-2 xs:py-3 flex items-center justify-between">
        <button
          onClick={onHelpClick}
          className="p-2 hover:opacity-70 active:opacity-50 transition-opacity touch-manipulation"
          aria-label="How to play"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </button>

        <h1 className="text-lg xs:text-xl sm:text-2xl font-bold tracking-wider uppercase">
          Custom Wordle
        </h1>

        <div className="w-10" /> {/* Spacer for centering */}
      </div>
    </header>
  );
}
