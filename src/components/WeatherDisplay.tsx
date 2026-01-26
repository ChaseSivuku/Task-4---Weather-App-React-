/**
 * WeatherDisplay Component
 * Displays current weather information
 */

import { getWeatherImage, formatTemperature } from "../utils/weatherUtils";
import type { WeatherData } from "../services/weatherService";

interface WeatherDisplayProps {
  weatherData: WeatherData;
  tempUnit: "metric" | "imperial";
}

export default function WeatherDisplay({ weatherData, tempUnit }: WeatherDisplayProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold">{weatherData.name}</h2>
      <div className="flex justify-center">
        <img
          src={getWeatherImage(weatherData.weather[0].main)}
          alt={weatherData.weather[0].main}
          className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
        />
      </div>
      <p className="text-base sm:text-lg">
        <span className="font-semibold">{formatTemperature(weatherData.main.temp, tempUnit)}</span>
      </p>
      <p className="text-sm sm:text-base">
        {weatherData.weather[0].main} - {weatherData.weather[0].description}
      </p>
      <p className="text-sm sm:text-base">Humidity: {weatherData.main.humidity}%</p>
      <p className="text-sm sm:text-base">Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
}


