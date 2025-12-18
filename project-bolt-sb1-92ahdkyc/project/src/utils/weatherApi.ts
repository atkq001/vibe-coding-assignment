import { CurrentWeather, ForecastDay } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    description: data.weather[0].description,
    weatherCondition: data.weather[0].main,
    icon: data.weather[0].icon,
  };
}

export async function getForecast(city: string): Promise<ForecastDay[]> {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }

  const data = await response.json();

  const dailyForecasts: ForecastDay[] = [];
  const processedDates = new Set<string>();

  for (const item of data.list) {
    const date = new Date(item.dt * 1000);
    const dateString = date.toISOString().split('T')[0];

    if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
      processedDates.add(dateString);
      dailyForecasts.push({
        date: dateString,
        temperature: Math.round(item.main.temp),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        description: item.weather[0].description,
        weatherCondition: item.weather[0].main,
        icon: item.weather[0].icon,
      });
    }
  }

  return dailyForecasts;
}
