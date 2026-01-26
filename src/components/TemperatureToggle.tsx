/**
 * TemperatureToggle Component
 * Toggle button for switching between Celsius and Fahrenheit
 */

interface TemperatureToggleProps {
  unit: "metric" | "imperial";
  onToggle: () => void;
}

export default function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="px-3 sm:px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold transition backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
      title={`Switch to ${unit === "metric" ? "Fahrenheit" : "Celsius"}`}
      aria-label={`Switch to ${unit === "metric" ? "Fahrenheit" : "Celsius"}`}
    >
      {unit === "metric" ? "°C" : "°F"}
    </button>
  );
}


