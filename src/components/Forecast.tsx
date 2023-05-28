import ForecastData from "@/types/Forecast";
import TempMath from "@/utils/TempMath";
import Image from "next/image";
import { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Forecast({ data, tempUnit }: { data: ForecastData, tempUnit: "imperial" | "metric" }) {

    const [expandedItem, setExpandedItem] = useState<number | null>();

    const handleItemClick = (index: number) => {
        if (expandedItem === index) {
            setExpandedItem(null);
        } else {
            setExpandedItem(index);
        }
    }

    return (
        <div className="w-3/4">
            <div>
                {data.list.slice(0, 7).map((item, index) => (
                    <div key={index}>
                        <button onClick={() => handleItemClick(index)} className="bg-[var(--bg-input-control)] hover:bg-[rgba(0,0,0,0.1)] p-[5px_20px] h-10 duration-500 rounded-md w-full m-1">
                            <div className="flex items-center h-full w-full cursor-pointer select-none text-sm">
                                <Image alt="weather" className="select-none" draggable={false} width={40} height={40} src={`/icons/${item.weather[0].icon}.png`} />
                                <span className="text-[var(--day)] flex flex-1 font-bold ml-3">{days[index]}</span>
                                <span className="flex-1 mr-3 text-right text-[var(--field)]">{item.weather[0].description.replace(/\b\w/g, (match) => match.toUpperCase())}</span>
                                <span>{TempMath.getTemperature(tempUnit, item.main.temp_min)}/{TempMath.getTemperature(tempUnit, item.main.temp_max)}</span>
                            </div>
                        </button>
                        {expandedItem === index && (
                            <div className="grid grid-cols-[auto_auto] gap-x-0 gap-y-3.5 flex-1 p-[5px_15px] border-x-2 bg-[var(--bg-input-control)] duration-1000 rounded-2xl border-black hover-[var(--input-active-bg)]">
                                <div className="flex items-center justify-between h-7 mx-2.5">
                                    <span className="text-[var(--field)]">Pressure:</span>
                                    <span>{item.main.pressure}hPa</span>
                                </div>
                                <div className="flex items-center justify-between h-7 mx-2.5">
                                    <span className="text-[var(--field)]">Humidity:</span>
                                    <span>{item.main.humidity}%</span>
                                </div>
                                <div className="flex items-center justify-between h-7 mx-2.5">
                                    <span className="text-[var(--field)]">Clouds:</span>
                                    <span>{item.clouds.all}%</span>
                                </div>
                                <div className="flex items-center justify-between h-7 mx-2.5">
                                    <span className="text-[var(--field)]">Wind Speed:</span>
                                    <span>{item.wind.speed} m/s</span>
                                </div>
                                <div className="flex items-center justify-between h-7 mx-2.5">
                                    <span className="text-[var(--field)]">Sea Level:</span>
                                    <span>{item.main.sea_level}m</span>
                                </div>
                                <div className="flex items-center justify-between h-7 mx-2.5">
                                    <span className="text-[var(--field)]">Feels Like:</span>
                                    <span>{TempMath.getTemperature(tempUnit, item.main.feels_like)}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}