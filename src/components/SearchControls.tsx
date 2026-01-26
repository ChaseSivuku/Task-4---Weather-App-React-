/**
 * SearchControls Component
 * Handles city search input and location button
 */

interface SearchControlsProps {
  city: string;
  onCityChange: (city: string) => void;
  onSearch: () => void;
  onLocationClick: () => void;
  isLoading?: boolean;
}

export default function SearchControls({
  city,
  onCityChange,
  onSearch,
  onLocationClick,
  isLoading = false,
}: SearchControlsProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && city.trim() && !isLoading) {
      onSearch();
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter city name"
        disabled={isLoading}
        className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={onSearch}
        disabled={isLoading || !city.trim()}
        className="p-2 rounded-lg bg-white hover:bg-white/90 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        title="Search"
      >
        <img
          src="/images/image-search.png"
          alt="Search"
          className="w-6 h-6"
        />
      </button>
      <button
        onClick={onLocationClick}
        disabled={isLoading}
        className="p-2 rounded-lg bg-white hover:bg-white/90 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        title="Get current location"
      >
        <img
          src="/images/location.png"
          alt="Current location"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
}

