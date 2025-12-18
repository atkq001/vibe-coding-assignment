import { ForecastDay } from '../types/weather';
import ForecastCard from './ForecastCard';

interface ForecastGridProps {
  forecasts: ForecastDay[];
}

export default function ForecastGrid({ forecasts }: ForecastGridProps) {
  return (
    <div className="w-full max-w-6xl">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecasts.map((forecast) => (
          <ForecastCard key={forecast.date} forecast={forecast} />
        ))}
      </div>
    </div>
  );
}
