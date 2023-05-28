import Forecast from '@/components/Forecast';
import Search from '@/components/Search';
import { DarkMode, LightMode } from '@/components/Toggle';
import Weather from '@/components/Weather';
import { GEO_API_OPTIONS, GEO_API_URL, WEATHER_API_URL } from '@/constants/API';
import ForecastData from '@/types/Forecast';
import WeatherData from '@/types/Weather';
import { useEffect, useState } from 'react'

export default function App() {

    const [theme, setTheme] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [tempUnit, setTempUnit] = useState<"imperial" | "metric">("metric");

    if(typeof window != "undefined") {
        if(weather) document.title = weather.city
    }

    useEffect(() => {
        if (typeof window != 'undefined') {
            if (localStorage.getItem("theme")) {
                localStorage.getItem("theme") != "light" ? setTheme("light") : setTheme("dark");
            } else {
                localStorage.setItem("theme", "dark");
                setTheme("dark");
            }
            document.documentElement.setAttribute("data-theme", localStorage.getItem("theme")!);
            
            if (localStorage.getItem("tempUnit")) {
                setTempUnit(localStorage.getItem("tempUnit") as any);
            } else {
                localStorage.setItem("tempUnit", "metric");
                setTempUnit("metric");
            }
        }
    }, []);

    useEffect(() => {
        // Get user's location using Geolocation API
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Fetch current weather and forecast using the obtained coordinates
                const currentWeatherFetch = fetch(
                    `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
                );
                const forecastFetch = fetch(
                    `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
                );

                const geoLocation = fetch(GEO_API_URL + `/cities?location=${latitude}${longitude}`, GEO_API_OPTIONS)

                Promise.all([currentWeatherFetch, forecastFetch, geoLocation])
                    .then(async (res) => {
                        const { data } = await res[2].json();
                        if (data) {
                            setWeather({
                                city: data[0] ? `${data[0].city}, ${data[0].countryCode}` : "Current Location",
                                ...(await res[0].json()),
                            });
                        }
                        setForecast({
                            city: "Current Location",
                            ...(await res[1].json()),
                        });
                    })
                    .catch((err) => console.error(err));
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    const toggleTheme = () => {
        theme != "light" ? setTheme("light") : setTheme("dark");
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", localStorage.getItem("theme")!);
    }

    const handleSearchChange = (data: { label: string, value: { latitude: number, longitude: number } }) => {
        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${data.value.latitude}&lon=${data.value.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`);
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${data.value.latitude}&lon=${data.value.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`);

        Promise.all([currentWeatherFetch, forecastFetch]).then(async (res) => {
            setWeather({ city: data.label, ...await res[0].json() });
            setForecast({ city: data.label, ...await res[1].json() });
        }).catch((err) => console.error(err));
    }

    return (
        <div className='w-full min-h-screen flex flex-col items-center px-3 py-2 gap-8'>
            <div className='flex items-center w-full pl-[15vw]'>
                <Search handleSearchChange={handleSearchChange} />
                <button onClick={() => toggleTheme()} className="ml-10 text-[2rem]">{theme != "dark" ? <LightMode /> : <DarkMode />}</button>
            </div>
            {weather && <Weather data={weather} tempUnit={tempUnit} setTempUnit={setTempUnit} />}
            {forecast && <Forecast data={forecast} tempUnit={tempUnit} />}
        </div>
    )
}
