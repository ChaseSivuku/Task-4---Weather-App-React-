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
      <div className="flex flex-col items-center justify-center py-8">
        <img
          src="/images/no-location.png"
          alt="Location not found"
          className="w-48 h-48 mx-auto mb-4"
        />
        <p className="text-white/80 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4 flex items-center justify-between">
      <p className="text-red-200 font-medium">{error}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 text-red-200 hover:text-white transition"
          aria-label="Dismiss error"
        >
          ×
        </button>
      )}
    </div>
  );
}

