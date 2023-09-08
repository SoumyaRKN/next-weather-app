export default async function handler(req, res) {
    if (req.method === "POST") {
        if (req.body.cityFlag) {
            const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${req.body.city}`;
            try {
                const response = await fetch(url);
                const result = await response.json();
                if (!result.error) {
                    const forecastOfTheDay = result.forecast.forecastday[0].hour.filter(item => new Date(item.time) >= new Date()).slice(0, 5).map(item => {
                        return {
                            time: item.time,
                            temp_c: item.temp_c,
                            condition: {
                                text: item.condition.text,
                                icon: item.condition.icon
                            },
                            wind_kph: item.wind_kph,
                            pressure_mb: item.pressure_mb,
                            humidity: item.humidity
                        }
                    });

                    const data = {
                        location: {
                            name: result.location.name,
                            region: result.location.region,
                            country: result.location.country
                        },
                        current: {
                            temp_c: result.current.temp_c,
                            condition: {
                                text: result.current.condition.text,
                                icon: result.current.condition.icon
                            },
                            wind_kph: result.current.wind_kph,
                            pressure_mb: result.current.pressure_mb,
                            humidity: result.current.humidity
                        },
                        forecast: {
                            forecastday: {
                                day: {
                                    maxtemp_c: result.forecast.forecastday[0].day.maxtemp_c,
                                    mintemp_c: result.forecast.forecastday[0].day.mintemp_c,
                                    avgtemp_c: result.forecast.forecastday[0].day.avgtemp_c,
                                    maxwind_kph: result.forecast.forecastday[0].day.maxwind_kph
                                },
                                astro: {
                                    sunrise: result.forecast.forecastday[0].astro.sunrise,
                                    sunset: result.forecast.forecastday[0].astro.sunset,
                                    moonrise: result.forecast.forecastday[0].astro.moonrise,
                                    moonset: result.forecast.forecastday[0].astro.moonset
                                },
                                hours: forecastOfTheDay
                            }
                        }
                    }

                    res.status(200).json({ success: true, data });
                } else {
                    res.status(200).json({ success: false, error: result.error.message });
                }
            } catch (error) {
                res.status(200).json({ success: false, error: error.message });
            }
        } else {
            const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${req.body.lat},${req.body.lon}`;
            try {
                const response = await fetch(url);
                const result = await response.json();
                if (!result.error) {
                    const forecastOfTheDay = result.forecast.forecastday[0].hour.filter(item => new Date(item.time) >= new Date()).slice(0, 5).map(item => {
                        return {
                            time: item.time,
                            temp_c: item.temp_c,
                            condition: {
                                text: item.condition.text,
                                icon: item.condition.icon
                            },
                            wind_kph: item.wind_kph,
                            pressure_mb: item.pressure_mb,
                            humidity: item.humidity
                        }
                    });

                    const data = {
                        location: {
                            name: result.location.name,
                            region: result.location.region,
                            country: result.location.country
                        },
                        current: {
                            temp_c: result.current.temp_c,
                            condition: {
                                text: result.current.condition.text,
                                icon: result.current.condition.icon
                            },
                            wind_kph: result.current.wind_kph,
                            pressure_mb: result.current.pressure_mb,
                            humidity: result.current.humidity
                        },
                        forecast: {
                            forecastday: {
                                day: {
                                    maxtemp_c: result.forecast.forecastday[0].day.maxtemp_c,
                                    mintemp_c: result.forecast.forecastday[0].day.mintemp_c,
                                    avgtemp_c: result.forecast.forecastday[0].day.avgtemp_c,
                                    maxwind_kph: result.forecast.forecastday[0].day.maxwind_kph
                                },
                                astro: {
                                    sunrise: result.forecast.forecastday[0].astro.sunrise,
                                    sunset: result.forecast.forecastday[0].astro.sunset,
                                    moonrise: result.forecast.forecastday[0].astro.moonrise,
                                    moonset: result.forecast.forecastday[0].astro.moonset
                                },
                                hours: forecastOfTheDay
                            }
                        }
                    }

                    res.status(200).json({ success: true, data });
                } else {
                    res.status(200).json({ success: false, error: result.error.message });
                }
            } catch (error) {
                res.status(200).json({ success: false, error: error.message });
            }
        }
    }
}