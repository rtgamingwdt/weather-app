export default class TempMath {

    public static metricToImperial(celsius: number) {
        return (
            (celsius * 9 / 5) + 32
        )
    }

    public static getTemperature(type: "metric" | "imperial", celsius: number) {
        if (type == "imperial") {
            return `${Math.round(this.metricToImperial(celsius))}°F`
        } else {
            return `${Math.round(celsius)}°C`
        }
    }
}