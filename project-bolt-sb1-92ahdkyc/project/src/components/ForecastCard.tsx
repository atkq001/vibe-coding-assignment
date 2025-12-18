import { ForecastDay } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastDay;
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  const date = new Date(forecast.date);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
      <div className="text-center">
        <p className="text-lg font-bold text-gray-800">{dayName}</p>
        <p className="text-sm text-gray-600 mb-3">{monthDay}</p>

        <img
          src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
          alt={forecast.description}
          className="w-20 h-20 mx-auto"
        />

        <p className="text-sm text-gray-600 capitalize mb-3">{forecast.description}</p>

        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl font-bold text-gray-800">
            {forecast.temperature}°
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-600">
          <span>{forecast.tempMax}°</span>
          <span className="text-gray-400">/</span>
          <span>{forecast.tempMin}°</span>
        </div>
      </div>
    </div>
  );
}
