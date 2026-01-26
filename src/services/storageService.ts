/**
 * LocalStorage Service
 * Handles all localStorage operations for weather data persistence
 */

import type { WeatherData, ForecastData } from "./weatherService";

const STORAGE_KEYS = {
  CITY: "weather_app_city",
  WEATHER_DATA: "weather_app_weather_data",
  FORECAST_DATA: "weather_app_forecast_data",
  TEMP_UNIT: "weather_app_temp_unit",
} as const;

/**
 * Saves weather data to localStorage
 */
export function saveWeatherData(
  city: string,
  weatherData: WeatherData,
  forecastData: ForecastData
): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CITY, city);
    localStorage.setItem(STORAGE_KEYS.WEATHER_DATA, JSON.stringify(weatherData));
    localStorage.setItem(STORAGE_KEYS.FORECAST_DATA, JSON.stringify(forecastData));
  } catch (error) {
    console.error("Failed to save weather data to localStorage:", error);
  }
}

/**
 * Retrieves weather data from localStorage
 */
export function getWeatherData(): {
  city: string | null;
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
} {
  try {
    const city = localStorage.getItem(STORAGE_KEYS.CITY);
    const weatherDataStr = localStorage.getItem(STORAGE_KEYS.WEATHER_DATA);
    const forecastDataStr = localStorage.getItem(STORAGE_KEYS.FORECAST_DATA);

    return {
      city,
      weatherData: weatherDataStr ? JSON.parse(weatherDataStr) : null,
      forecastData: forecastDataStr ? JSON.parse(forecastDataStr) : null,
    };
  } catch (error) {
    console.error("Failed to retrieve weather data from localStorage:", error);
    return {
      city: null,
      weatherData: null,
      forecastData: null,
    };
  }
}

/**
 * Saves temperature unit preference
 */
export function saveTempUnit(unit: "metric" | "imperial"): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TEMP_UNIT, unit);
  } catch (error) {
    console.error("Failed to save temperature unit to localStorage:", error);
  }
}

/**
 * Retrieves temperature unit preference
 */
export function getTempUnit(): "metric" | "imperial" {
  try {
    const unit = localStorage.getItem(STORAGE_KEYS.TEMP_UNIT);
    return unit === "imperial" ? "imperial" : "metric";
  } catch (error) {
    console.error("Failed to retrieve temperature unit from localStorage:", error);
    return "metric";
  }
}

/**
 * Clears all weather data from localStorage
 */
export function clearWeatherData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CITY);
    localStorage.removeItem(STORAGE_KEYS.WEATHER_DATA);
    localStorage.removeItem(STORAGE_KEYS.FORECAST_DATA);
  } catch (error) {
    console.error("Failed to clear weather data from localStorage:", error);
  }
}

