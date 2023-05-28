import Image from "next/image";
import WeatherData from "@/types/Weather";
import { Dispatch, SetStateAction, useState } from "react";
import TempMath from "@/utils/TempMath";

export default function Weather({ data, tempUnit, setTempUnit }: { data: WeatherData, tempUnit: "metric" | "imperial", setTempUnit: Dispatch<SetStateAction<"imperial" | "metric">> }) {

    const [showUnitModal, setShowUnitModal] = useState(false);

    return (
        <div className="w-80 bg-[var(--bg-input-control)] px-5 pb-5 text-lg rounded-md shadow-[10px_-2px_20px_2px_black] hover:shadow-[10px_-2px_10px_2px_black]">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold text-lg">{data.city}</p>
                    <p className="text-sm">{data.weather[0].description.replace(/\b\w/g, (match) => match.toUpperCase())}</p>
                </div>
                <Image src={`/icons/${data.weather[0].icon}.png`} alt={"weather"} width={100} height={100} className="select-none" draggable={false} />
            </div>
            <div className="flex justify-between items-center">
                <button onClick={() => setShowUnitModal(true)} className="text-7xl tracking-tighter font-bold m-[10px_0]">{TempMath.getTemperature(tempUnit, data.main.temp)}</button>
                {showUnitModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-[rgba(0,0,0,0.5)] p-6 rounded shadow">
                            <p className="text-lg font-semibold mb-4">Select Temperature Unit</p>
                            <div className="flex justify-center">
                                <button
                                    className="bg-[var(--panel-bg)] hover:bg-[var(--panel-hover-bg)] font-bold py-2 px-4 rounded mr-4"
                                    onClick={() => {
                                        setTempUnit("metric");
                                        localStorage.setItem("tempUnit", "metric");
                                        setShowUnitModal(false);
                                    }}
                                >
                                    Celsius
                                </button>
                                <button
                                    className="bg-[var(--panel-bg)] hover:bg-[var(--panel-hover-bg)] font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        setTempUnit("imperial");
                                        localStorage.setItem("tempUnit", "imperial");
                                        setShowUnitModal(false);
                                    }}
                                >
                                    Fahrenheit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="w-full pl-5 text-xs">
                    <div className="flex justify-between">
                        <span className="text-left font-normal flex justify-between items-center border-b">Details</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-left font-normal">Feels Like</span>
                        <span className="text-right font-bold">{TempMath.getTemperature(tempUnit, data.main.feels_like)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-left font-normal">Wind</span>
                        <span className="text-right font-bold">{data.wind.speed} m/s</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-left font-normal">Humidity</span>
                        <span className="text-right font-bold">{data.main.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-left font-normal">Pressure</span>
                        <span className="text-right font-bold">{data.main.pressure}hPa</span>
                    </div>
                </div>
            </div>
        </div>
    )
}