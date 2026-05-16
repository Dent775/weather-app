import { useSuspenseQuery } from "@tanstack/react-query"
import Card from "./Cards"
import { getCurrentWeather } from "../../api"
import WeatherIcon from "../WeatherIcon"
import type { Coords } from "../../types"


type Props = {
    coords:Coords
}

export default function CurrentWeather({coords}: Props) {

    const {data}=useSuspenseQuery({
    queryKey:['weather',coords],
    queryFn: ()=>getCurrentWeather({lat:coords.lat,lon:coords.lon}),
    retry:false,
 staleTime:1000*60*30
})

  return (
    <Card title="CurrentWeather" childrenClassName="flex flex-col items-center gap-6">
        <div className="flex flex-col gap-2 items-center">
            <h2 className="text-6xl font-semibold text-center">
                {Math.round(data!.current.temp)}°C
            </h2>
            <WeatherIcon src={data!.current.weather[0].icon} className="size-14"/>
            <h3 className="capitalize text-xl">
                {data?.current.weather[0].description}
            </h3>
        </div>
        <div className="flex flex-col gap-2">
            <p className="text-xl text-center">Local Time:</p>
            <h3 className="text-3xl font-semibold">
                {new Intl.DateTimeFormat("en-US",{
                    hour:"2-digit",
                    minute:"2-digit",
                    hour12: true,
                    timeZone:data?.timezone
                }).format(new Date(data!.current.dt*1000))}
            </h3>
        </div>
        <div className="flex justify-between w-full">
            <div className="flex flex-col items-center gap-2">
                <p className="text-gray-500">Feels like</p>
                <p>{Math.round(data!.current.feels_like)}°C</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <p className="text-gray-500">Humidity</p>
                <p>{Math.round(data!.current.humidity)}%</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <p className="text-gray-500">Wind Speed</p>
                <p>{Math.round(data!.current.wind_speed)} Kmph</p>
            </div>
        </div>
    </Card>
  )
}