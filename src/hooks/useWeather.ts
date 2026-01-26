/**
 * useWeather Hook
 * Custom hook for managing weather state and operations
 */

import { useState, useEffect, useCallback } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../services/weatherService";
import { saveWeatherData, getWeatherData, saveTempUnit, getTempUnit } from "../services/storageService";
import type { WeatherData, ForecastData } from "../services/weatherService";

interface UseWeatherReturn {
  city: string;
  setCity: (city: string) => void;
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  error: string;
  isLoading: boolean;
  tempUnit: "metric" | "imperial";
  toggleTempUnit: () => void;
  searchByCity: (cityName: string) => Promise<void>;
  searchByLocation: () => Promise<void>;
  clearError: () => void;
}

export function useWeather(): UseWeatherReturn {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tempUnit, setTempUnit] = useState<"metric" | "imperial">("metric");
  const [lastSearchCity, setLastSearchCity] = useState<string>("");
  const [lastCoords, setLastCoords] = useState<{ lat: number; lon: number } | null>(null);

  // Load saved preferences on mount
  useEffect(() => {
    const savedUnit = getTempUnit();
    setTempUnit(savedUnit);

    const saved = getWeatherData();
    if (saved.weatherData && saved.forecastData) {
      setCity(saved.city || "");
      setWeatherData(saved.weatherData);
      setForecastData(saved.forecastData);
      setLastSearchCity(saved.city || "");
    }
  }, []);

  /**
   * Search weather by city name
   */
  const searchByCity = useCallback(
    async (cityName: string) => {
      if (!cityName.trim()) {
        setError("Please enter a city name");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const { weather, forecast } = await fetchWeatherByCity(cityName.trim(), tempUnit);
        setWeatherData(weather);
        setForecastData(forecast);
        setCity(weather.name);
        setLastSearchCity(cityName.trim());
        setLastCoords(null); // Clear coords when searching by city
        saveWeatherData(weather.name, weather, forecast);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch weather data";
        setError(errorMessage);
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [tempUnit]
  );

  /**
   * Search weather by current location
   */
  const searchByLocation = useCallback(async () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });

      const { weather, forecast } = await fetchWeatherByCoords(
        position.coords.latitude,
        position.coords.longitude,
        tempUnit
      );

      setWeatherData(weather);
      setForecastData(forecast);
      setCity(weather.name);
      setLastCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
      setLastSearchCity(""); // Clear city when using location
      saveWeatherData(weather.name, weather, forecast);
    } catch (err) {
      let errorMessage = "Failed to get your location";
      
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setIsLoading(false);
    }
  }, [tempUnit]);

  /**
   * Refetch weather using stored coordinates (for unit toggle)
   */
  const refetchByStoredCoords = useCallback(
    async (coords: { lat: number; lon: number }, unit: "metric" | "imperial") => {
      setIsLoading(true);
      setError("");

      try {
        const { weather, forecast } = await fetchWeatherByCoords(coords.lat, coords.lon, unit);
        setWeatherData(weather);
        setForecastData(forecast);
        setCity(weather.name);
        saveWeatherData(weather.name, weather, forecast);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch weather data";
        setError(errorMessage);
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Toggle temperature unit
   */
  const toggleTempUnit = useCallback(async () => {
    const newUnit = tempUnit === "metric" ? "imperial" : "metric";
    setTempUnit(newUnit);
    saveTempUnit(newUnit);

    // Refetch data with new unit
    if (lastSearchCity) {
      await searchByCity(lastSearchCity);
    } else if (lastCoords) {
      await refetchByStoredCoords(lastCoords, newUnit);
    }
  }, [tempUnit, lastSearchCity, lastCoords, searchByCity, refetchByStoredCoords]);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
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
  };
}

