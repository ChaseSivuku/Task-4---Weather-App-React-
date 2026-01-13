import { useState, useEffect } from "react";

export default function Weather() {
  const API_KEY = import.meta.env.VITE_API_KEY || "a0a2c781854b6f1fbc9885026d33ba5e";
  
  // Debug: Check if API key is loaded (remove in production)
  useEffect(() => {
    console.log("API Key loaded:", import.meta.env.VITE_API_KEY ? "Yes (from .env)" : "No (using fallback)");
    console.log("API Key length:", API_KEY ? API_KEY.length : 0);
  }, []);

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  // Fetch weather by city name
  const fetchWeatherByCity = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "City not found");
      }
      const data = await response.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!forecastResponse.ok) throw new Error("Forecast not found");
      const forecast = await forecastResponse.json();

      setWeatherData(data);
      setForecastData(forecast);
      setError("");

      // Save to localStorage
      localStorage.setItem("city", cityName);
      localStorage.setItem("weatherData", JSON.stringify(data));
      localStorage.setItem("forecastData", JSON.stringify(forecast));
    } catch (err: any) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      if (!API_KEY) {
        throw new Error("API key is missing. Please check your .env file.");
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      console.log("Fetching weather from:", url.replace(API_KEY, "***"));
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      console.log("Fetching forecast from:", forecastUrl.replace(API_KEY, "***"));
      
      const forecastResponse = await fetch(forecastUrl);
      
      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json().catch(() => ({}));
        console.error("Forecast API Error Response:", errorData);
        throw new Error(errorData.message || `Forecast API Error: ${forecastResponse.status}`);
      }
      
      const forecast = await forecastResponse.json();

      setWeatherData(data);
      setForecastData(forecast);
      setCity(data.name);
      setError("");

      // Save to localStorage
      localStorage.setItem("city", data.name);
      localStorage.setItem("weatherData", JSON.stringify(data));
      localStorage.setItem("forecastData", JSON.stringify(forecast));
    } catch (err: any) {
      console.error("Error fetching weather:", err);
      setError(err.message || "Failed to fetch weather data");
      setWeatherData(null);
      setForecastData(null);
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (!API_KEY) {
      setError("API key is missing. Please check your .env file.");
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log("Location obtained:", pos.coords.latitude, pos.coords.longitude);
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Error message removed - user can search manually
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError("Geolocation not supported.");
    }
  };

  // On mount → get real-time location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getWeatherImage = (main: string): string => {
    if (main === "Clear") return "/images/clear.png";
    if (main === "Clouds") return "/images/clouds.png";
    if (main === "Rain") return "/images/rain.png";
    if (main === "Drizzle") return "/images/drizzle.png";
    if (main === "Thunderstorm") return "/images/thunderstorm.png";
    if (main === "Snow") return "/images/snow.png";
    if (main === "Mist" || main === "Fog" || main === "Haze") return "/images/mist.png";
    return "/images/default.png";
  };

  const dailyForecast = forecastData
    ? forecastData.list.filter((_: any, i: number) => i % 8 === 0)
    : [];

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-6 relative"
      style={{
        backgroundImage: 'url(/images/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center text-white">

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && city.trim()) {
                  fetchWeatherByCity(city.trim());
                }
              }}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => fetchWeatherByCity(city)}
              className="p-2 rounded-lg bg-white hover:bg-white/90 transition flex items-center justify-center"
              title="Search"
            >
              <img
                src="/images/image-search.png"
                alt="Search"
                className="w-6 h-6"
              />
            </button>
            <button
              onClick={getCurrentLocation}
              className="p-2 rounded-lg bg-white hover:bg-white/90 transition flex items-center justify-center"
              title="Get current location"
            >
              <img
                src="/images/location.png"
                alt="Current location"
                className="w-6 h-6"
              />
            </button>
          </div>

          {error && error.toLowerCase().includes("not found") && !weatherData && (
            <div className="flex flex-col items-center justify-center py-8">
              <img
                src="/images/no-location.png"
                alt="Location not found"
                className="w-48 h-48 mx-auto mb-4"
              />
              <p className="text-white/80 text-center">Location not found</p>
            </div>
          )}

          {error && !error.toLowerCase().includes("not found") && <p className="text-red-400 font-medium mb-4">{error}</p>}

          {weatherData && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{weatherData.name}</h2>
              <img
                src={getWeatherImage(weatherData.weather[0].main)}
                alt={weatherData.weather[0].main}
                className="w-28 h-28 mx-auto"
              />
              <p className="text-lg">
                 <span className="font-semibold">{weatherData.main.temp}°C</span>
              </p>
              <p>
                {weatherData.weather[0].main} - {weatherData.weather[0].description}
              </p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          )}
        </div>

        {forecastData && (
          <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Forecast</h3>
            <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-96 pr-2">
              {dailyForecast.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white/20 p-4 rounded-lg text-center"
                >
                  <p className="text-sm mb-2">
                    {new Date(item.dt_txt).toLocaleDateString(undefined, {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    src={getWeatherImage(item.weather[0].main)}
                    alt={item.weather[0].main}
                    className="w-12 h-12 mx-auto mb-1"
                  />
                  <p className="text-sm">{Math.round(item.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
