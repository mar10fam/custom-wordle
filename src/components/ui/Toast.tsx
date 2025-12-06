interface ToastProps {
  message: string;
  isVisible: boolean;
}

export function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-foreground text-background px-4 py-3 rounded font-bold text-sm">
        {message}
      </div>
    </div>
  );
}
