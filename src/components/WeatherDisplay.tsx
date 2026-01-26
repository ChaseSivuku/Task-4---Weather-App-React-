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
      <h2 className="text-2xl font-bold">{weatherData.name}</h2>
      <img
        src={getWeatherImage(weatherData.weather[0].main)}
        alt={weatherData.weather[0].main}
        className="w-28 h-28 mx-auto"
      />
      <p className="text-lg">
        <span className="font-semibold">{formatTemperature(weatherData.main.temp, tempUnit)}</span>
      </p>
      <p>
        {weatherData.weather[0].main} - {weatherData.weather[0].description}
      </p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
}

