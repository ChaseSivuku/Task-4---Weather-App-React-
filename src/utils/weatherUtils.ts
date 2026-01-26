/**
 * Weather Utility Functions
 * Helper functions for weather-related operations
 */

/**
 * Maps weather condition to image path
 */
export function getWeatherImage(condition: string): string {
  const imageMap: Record<string, string> = {
    Clear: "/images/clear.png",
    Clouds: "/images/clouds.png",
    Rain: "/images/rain.png",
    Drizzle: "/images/drizzle.png",
    Thunderstorm: "/images/thunderstorm.png",
    Snow: "/images/snow.png",
    Mist: "/images/mist.png",
    Fog: "/images/mist.png",
    Haze: "/images/mist.png",
  };

  return imageMap[condition] || "/images/default.png";
}

/**
 * Converts temperature from one unit to another
 */
export function convertTemperature(
  temp: number,
  fromUnit: "metric" | "imperial",
  toUnit: "metric" | "imperial"
): number {
  if (fromUnit === toUnit) return temp;

  if (fromUnit === "metric" && toUnit === "imperial") {
    // Celsius to Fahrenheit
    return (temp * 9) / 5 + 32;
  } else {
    // Fahrenheit to Celsius
    return ((temp - 32) * 5) / 9;
  }
}

/**
 * Formats temperature with unit symbol
 */
export function formatTemperature(temp: number, unit: "metric" | "imperial"): string {
  const rounded = Math.round(temp);
  const symbol = unit === "metric" ? "°C" : "°F";
  return `${rounded}${symbol}`;
}

/**
 * Gets temperature unit symbol
 */
export function getTempUnitSymbol(unit: "metric" | "imperial"): string {
  return unit === "metric" ? "°C" : "°F";
}

