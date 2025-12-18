import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastGrid from './components/ForecastGrid';
import { getCurrentWeather, getForecast } from './utils/weatherApi';
import { CurrentWeather as CurrentWeatherType, ForecastDay } from './types/weather';

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBackgroundGradient = (condition?: string) => {
    if (!condition) return 'from-blue-400 via-blue-500 to-blue-600';

    switch (condition.toLowerCase()) {
      case 'clear':
        return 'from-orange-400 via-yellow-400 to-blue-400';
      case 'clouds':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
      case 'drizzle':
        return 'from-slate-600 via-slate-700 to-blue-900';
      case 'thunderstorm':
        return 'from-gray-800 via-gray-900 to-slate-900';
      case 'snow':
        return 'from-blue-200 via-blue-300 to-gray-300';
      case 'mist':
      case 'fog':
      case 'haze':
        return 'from-gray-300 via-gray-400 to-gray-500';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(
        currentWeather?.weatherCondition
      )} transition-all duration-1000 ease-in-out`}
    >
      <div className="min-h-screen backdrop-blur-sm py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Weather Dashboard
            </h1>
            <p className="text-white/90 text-lg drop-shadow">
              Get real-time weather updates for any city
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {error && (
              <div className="w-full max-w-2xl bg-red-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3">
                <AlertCircle size={24} />
                <p>{error}</p>
              </div>
            )}

            {isLoading && (
              <div className="text-white text-xl animate-pulse">Loading weather data...</div>
            )}

            {!isLoading && currentWeather && (
              <>
                <CurrentWeather weather={currentWeather} />
                {forecast.length > 0 && <ForecastGrid forecasts={forecast} />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
