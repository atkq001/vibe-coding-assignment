import { Cloud, Droplets, Wind, MapPin } from 'lucide-react';
import { CurrentWeather as CurrentWeatherType } from '../types/weather';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
}

export default function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="text-gray-600" size={24} />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {weather.city}, {weather.country}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        <div className="flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt={weather.description}
            className="w-32 h-32"
          />
          <div>
            <div className="text-6xl md:text-7xl font-bold text-gray-800">
              {weather.temperature}°
            </div>
            <p className="text-lg text-gray-600 capitalize mt-2">
              {weather.description}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Feels like {weather.feelsLike}°
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
          <Cloud className="text-blue-500" size={32} />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{weather.weatherCondition}</p>
            <p className="text-sm text-gray-600">Condition</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
          <Droplets className="text-blue-500" size={32} />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{weather.humidity}%</p>
            <p className="text-sm text-gray-600">Humidity</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
          <Wind className="text-blue-500" size={32} />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{weather.windSpeed}</p>
            <p className="text-sm text-gray-600">km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
