/**
 * Weather Component
 * Main component for displaying weather information
 */

import { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import SearchControls from "./SearchControls";
import WeatherDisplay from "./WeatherDisplay";
import ForecastDisplay from "./ForecastDisplay";
import ErrorDisplay from "./ErrorDisplay";
import TemperatureToggle from "./TemperatureToggle";

export default function Weather() {
  const {
    city,
    setCity,
    weatherData,
    forecastData,
    error,
    isLoading,
    tempUnit,
    toggleTempUnit,
    searchByCity,
    searchByLocation,
    clearError,
  } = useWeather();

  // Fetch weather for current location on mount
  useEffect(() => {
    // Only fetch if we don't have cached data
    if (!weatherData) {
      searchByLocation();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    if (city.trim()) {
      searchByCity(city.trim());
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 relative"
      style={{
        backgroundImage: "url(/images/background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center text-white">
          <div className="flex justify-end mb-4">
            <TemperatureToggle unit={tempUnit} onToggle={toggleTempUnit} />
          </div>

          <SearchControls
            city={city}
            onCityChange={setCity}
            onSearch={handleSearch}
            onLocationClick={searchByLocation}
            isLoading={isLoading}
          />

          <ErrorDisplay error={error} onDismiss={clearError} />

          {weatherData && <WeatherDisplay weatherData={weatherData} tempUnit={tempUnit} />}
        </div>

        {forecastData && (
          <ForecastDisplay forecastData={forecastData} tempUnit={tempUnit} />
        )}
      </div>
    </div>
  );
}
