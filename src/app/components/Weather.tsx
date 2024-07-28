// components/Weather.tsx
'use client';

import { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setWeather(null); // Reset weather data to avoid stale data
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=41ca5e0f8cbbc4cdf9a9949c2589dfbe`
         
      );
      console.log(response);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl mb-4">Weather App</h1>
      <form onSubmit={fetchWeather} className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Get Weather
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {weather && weather.main && weather.weather && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl">{weather.name}</h2>
          {weather.main && <p>Temperature: {weather.main.temp}°C</p>}
          {weather.main && <p>Humidity: {weather.main.humidity}%</p>}
          {weather.weather && <p>Condition: {weather.weather[0].description}</p>}
        </div>
      )}
    </div>
  );
};

export default Weather;
