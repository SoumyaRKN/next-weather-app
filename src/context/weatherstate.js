import { useState } from "react";
import WeatherContext from "./weathercontext";

const WeatherState = (props) => {
    const [weatherData, setWeatherData] = useState();

    return (
        <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
            {props.children}
        </WeatherContext.Provider>
    );
}

export default WeatherState;