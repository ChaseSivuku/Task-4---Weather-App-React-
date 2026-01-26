/**
 * ErrorDisplay Component
 * Displays error messages with consistent styling
 */

interface ErrorDisplayProps {
  error: string;
  onDismiss?: () => void;
}

export default function ErrorDisplay({ error, onDismiss }: ErrorDisplayProps) {
  if (!error) return null;

  const isNotFound = error.toLowerCase().includes("not found");

  if (isNotFound) {
    return (
      <div className="flex flex-col items-center justify-center py-6 sm:py-8">
        <img
          src="/images/no-location.png"
          alt="Location not found"
          className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 object-contain"
        />
        <p className="text-white/80 text-center text-sm sm:text-base px-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 sm:p-4 mb-4 flex items-center justify-between gap-2">
      <p className="text-red-200 font-medium text-sm sm:text-base flex-1">{error}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-2 text-red-200 hover:text-white transition text-xl sm:text-2xl font-bold min-w-[32px] min-h-[32px] flex items-center justify-center flex-shrink-0"
          aria-label="Dismiss error"
        >
          ×
        </button>
      )}
    </div>
  );
}


