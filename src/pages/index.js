import React, { useContext, useEffect } from 'react';
import { Inter } from 'next/font/google';
import weatherContext from '@/context/weathercontext';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { weatherData, setWeatherData } = useContext(weatherContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(`/api/getCurrentLocationWeather`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cityFlag: false,
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        }).then(response => response.json()).then(res => {
          if (res.success) {
            setWeatherData(res.data);
            console.log(res);
          } else {
            alert("SOMTHING WENT WRONG! PLEASE TRY AGAIN");
          }
        }).catch(error => console.error('Error:', error));
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    weatherData && <div className="main-container flex flex-col items-center justify-center text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">

      <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-6xl font-bold">{weatherData.current.temp_c}°C</span>
            <span className="font-semibold mt-1 text-gray-500">{`${weatherData.location.name}, ${weatherData.location.region}`}</span>
          </div>
          <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
        </div>
        <div className="flex justify-between mt-12">
          {weatherData.forecast.forecastday.hours.map(item => {
            const time = new Date(item.time);
            const fullTime = `${time.getHours() === 0 ? "12" : time.getHours() % 12 || 12}:${time.getMinutes() === 0 ? '00' : time.getMinutes()}`;

            return <div className="flex flex-col items-center" key={item.time}>
              <span className="font-semibold text-lg">{item.temp_c}°C</span>
              <img src={item.condition.icon} alt={item.condition.text} />
              <span className="font-semibold mt-1 text-sm">{fullTime}</span>
              <span className="text-xs font-semibold text-gray-400">{time.getHours() >= 12 ? "PM" : "AM"}</span>
            </div>
          })}
        </div>
      </div>

      <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Humidity</div>
          <div class="w-auto text-right font-semibold">{weatherData.current.humidity}</div>
        </div>
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Pressure</div>
          <div class="w-auto text-right font-semibold">{weatherData.current.pressure_mb} MB</div>
        </div>
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Wind Speed</div>
          <div class="w-auto text-right font-semibold">{weatherData.current.wind_kph} KPH</div>
        </div>
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Average Temperature</div>
          <div class="w-auto text-right font-semibold">{weatherData.forecast.forecastday.day.avgtemp_c}°C</div>
        </div>
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Maximum Temperature</div>
          <div class="w-auto text-right font-semibold">{weatherData.forecast.forecastday.day.maxtemp_c}°C</div>
        </div>
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Minimum Temperature</div>
          <div class="w-auto text-right font-semibold">{weatherData.forecast.forecastday.day.mintemp_c}°C</div>
        </div>
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Maximum Wind Speed</div>
          <div class="w-auto text-right font-semibold">{weatherData.forecast.forecastday.day.maxwind_kph} KPH</div>
        </div>
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Sunrise</div>
          <div class="w-auto text-right font-semibold">{weatherData.forecast.forecastday.astro.sunrise}</div>
        </div>
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Sunset</div>
          <div class="w-auto text-right font-semibold">{weatherData.forecast.forecastday.astro.sunset}</div>
        </div>
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Moonrise</div>
          <div class="w-auto text-right font-semibold">{weatherData.forecast.forecastday.astro.moonrise}</div>
        </div>
        <div class="flex justify-between w-full">
          <div class="w-auto font-bold uppercase text-90">Moonset</div>
          <div class="w-auto text-right font-semibold">{weatherData.forecast.forecastday.astro.moonset}</div>
        </div>
      </div>

    </div>
  );
}
