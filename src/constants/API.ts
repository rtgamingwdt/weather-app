export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5"

export const GEO_API_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_GEO_API_KEY!,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};