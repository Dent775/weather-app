import { geocodeSchema } from "./schema/geocodeSchema";
import { weatherSchema } from "./schema/weatherSchema";

const API_KEY=import.meta.env.VITE_API_KEY;
console.log(API_KEY);
export async function getCurrentWeather({lat,lon}:{lat:number,lon:number}){
    const res=await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`);
    if(!res.ok)
        throw new Error("Error fetching current weather")
    const data=await res.json();
    const result= weatherSchema.safeParse(data);
    if(!result.success)
    {
        console.log(result.error);
        return null;
    }   
    return result.data;
}

export async function getGeocode(location:string){
    const res=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);
    if(!res.ok)
        throw new Error("Error fetching current city")
    const data=await res.json();
    const result= geocodeSchema.safeParse(data);
    if(!result.success)
    {
        console.log(result.error);
        return null;
    }   
    return result.data;
}
