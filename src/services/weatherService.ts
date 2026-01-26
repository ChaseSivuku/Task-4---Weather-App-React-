/**
 * Weather API Service
 * Handles all API calls to OpenWeatherMap
 */

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
  };
}

const API_KEY = import.meta.env.VITE_API_KEY || "a0a2c781854b6f1fbc9885026d33ba5e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetches current weather data by city name
 */
export async function fetchWeatherByCity(
  cityName: string,
  units: "metric" | "imperial" = "metric"
): Promise<{ weather: WeatherData; forecast: ForecastData }> {
  if (!API_KEY) {
    throw new Error("API key is missing. Please check your .env file.");
  }

  const cityNameEncoded = encodeURIComponent(cityName.trim());

  // Fetch current weather
  const weatherResponse = await fetch(
    `${BASE_URL}/weather?q=${cityNameEncoded}&appid=${API_KEY}&units=${units}`
  );

  if (!weatherResponse.ok) {
    const errorData = await weatherResponse.json().catch(() => ({}));
    if (weatherResponse.status === 404) {
      throw new Error("City not found. Please check the city name and try again.");
    }
    throw new Error(
      errorData.message || `Failed to fetch weather data: ${weatherResponse.statusText}`
    );
  }

  const weatherData: WeatherData = await weatherResponse.json();

  // Fetch forecast
  const forecastResponse = await fetch(
    `${BASE_URL}/forecast?q=${cityNameEncoded}&appid=${API_KEY}&units=${units}`
  );

  if (!forecastResponse.ok) {
    const errorData = await forecastResponse.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch forecast data: ${forecastResponse.statusText}`
    );
  }

  const forecastData: ForecastData = await forecastResponse.json();

  return { weather: weatherData, forecast: forecastData };
}

/**
 * Fetches current weather data by coordinates
 */
export async function fetchWeatherByCoords(
  lat: number,
  lon: number,
  units: "metric" | "imperial" = "metric"
): Promise<{ weather: WeatherData; forecast: ForecastData }> {
  if (!API_KEY) {
    throw new Error("API key is missing. Please check your .env file.");
  }

  // Fetch current weather
  const weatherResponse = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  );

  if (!weatherResponse.ok) {
    const errorData = await weatherResponse.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch weather data: ${weatherResponse.statusText}`
    );
  }

  const weatherData: WeatherData = await weatherResponse.json();

  // Fetch forecast
  const forecastResponse = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  );

  if (!forecastResponse.ok) {
    const errorData = await forecastResponse.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch forecast data: ${forecastResponse.statusText}`
    );
  }

  const forecastData: ForecastData = await forecastResponse.json();

  return { weather: weatherData, forecast: forecastData };
}


