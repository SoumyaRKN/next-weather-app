import { Inter } from 'next/font/google';
import React, { useContext, useEffect } from 'react';
import weatherContext from '@/context/weathercontext';
import spinnerContext from '@/context/spinnercontext';
import { CirclesWithBar } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { weatherData, setWeatherData } = useContext(weatherContext);
  const { isSpinner, setisSpinner } = useContext(spinnerContext);

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
            setisSpinner(false);
          } else {
            setisSpinner(false);
            toast.error("Something went wrong!");
          }
        }).catch(error => {
          setisSpinner(false);
          console.error('Error:', error);
          toast.error("Something went wrong!");
        });
      });
    } else {
      setisSpinner(false);
      toast.error("Geolocation is not supported by this browser!");
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {isSpinner && <CirclesWithBar
        height="200"
        width="200"
        color="#0534ae"
        wrapperStyle={{
          minHeight: "81.8vh"
        }}
        wrapperClass="justify-center items-center bg-gradient-to-br from-indigo-100 to-neutral-200"
        ariaLabel='circles-with-bar-loading'
      />}

      {weatherData && !isSpinner && <div className="main-containe flex flex-col items-center justify-center text-gray-700 p-10 bg-gradient-to-br from-indigo-100 to-neutral-200">

        <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-6xl font-bold">{weatherData.current.temp_c}°C</span>
              <span className="font-semibold mt-1 text-gray-500">{`${weatherData.location.name}, ${weatherData.location.region}`}</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
              <span className="font-semibold mt-1 text-gray-500">{weatherData.current.condition.text}</span>
            </div>
          </div>
          <div className="flex justify-between flex-wrap mt-12">
            {weatherData.forecast.forecastday.hours.map(item => {
              const time = new Date(item.time);
              const fullTime = `${time.getHours() === 0 ? "12" : time.getHours() % 12 || 12}:${time.getMinutes() === 0 ? '00' : time.getMinutes()}`;

              return <div className="flex flex-col items-center my-3" key={item.time}>
                <span className="font-semibold text-lg">{item.temp_c}°C</span>
                <img src={item.condition.icon} alt={item.condition.text} />
                <span className="font-semibold my-1 text-sm">{item.condition.text}</span>
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

      </div>}
    </>
  );
}
