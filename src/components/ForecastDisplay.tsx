/**
 * ForecastDisplay Component
 * Displays 5-day weather forecast
 */

import { getWeatherImage, formatTemperature } from "../utils/weatherUtils";
import type { ForecastData } from "../services/weatherService";

interface ForecastDisplayProps {
  forecastData: ForecastData;
  tempUnit: "metric" | "imperial";
}

export default function ForecastDisplay({ forecastData, tempUnit }: ForecastDisplayProps) {
  // Filter to get one forecast per day (every 8th item, as API returns 3-hour intervals)
  const dailyForecast = forecastData.list.filter((_, i) => i % 8 === 0);

  return (
    <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 text-white">
      <h3 className="text-xl font-bold mb-4">Forecast</h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 overflow-y-auto max-h-96 pr-2">
        {dailyForecast.map((item, idx) => (
          <div key={idx} className="bg-white/20 p-3 sm:p-4 rounded-lg text-center flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm mb-2">
              {new Date(item.dt_txt).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>
            <img
              src={getWeatherImage(item.weather[0].main)}
              alt={item.weather[0].main}
              className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 object-contain flex-shrink-0"
            />
            <p className="text-xs sm:text-sm">{formatTemperature(item.main.temp, tempUnit)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


