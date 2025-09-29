import { useState, useEffect } from "react";

export default function Weather() {
  const API_KEY = "a0a2c781854b6f1fbc9885026d33ba5e";

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
      if (!response.ok) throw new Error("City not found");
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
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("Location not found");
      const data = await response.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!forecastResponse.ok) throw new Error("Forecast not found");
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
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    }
  };

  // On mount → check localStorage, then ask for location
  useEffect(() => {
    const savedCity = localStorage.getItem("city");
    const savedWeather = localStorage.getItem("weatherData");
    const savedForecast = localStorage.getItem("forecastData");

    if (savedCity && savedWeather && savedForecast) {
      setCity(savedCity);
      setWeatherData(JSON.parse(savedWeather));
      setForecastData(JSON.parse(savedForecast));
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
          },
          (err) => {
            setError("Location access denied. Please search manually.");
          }
        );
      } else {
        setError("Geolocation not supported.");
      }
    }
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-indigo-900 p-6">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">

        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center text-white">

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => fetchWeatherByCity(city)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-semibold"
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-400 font-medium mb-4">{error}</p>}

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
            <div className="flex overflow-x-auto gap-4 pb-2">
              {dailyForecast.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-24 bg-white/20 p-4 rounded-lg text-center"
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
