import { useSuspenseQuery } from '@tanstack/react-query'

import { getCurrentWeather } from '../../api'
import Card from './Cards'
import WeatherIcon from '../WeatherIcon'
import type { Coords } from '../../types'

type Props = {
    coords:Coords
}

export default function HourlyForecast({coords}: Props) {

 const {data}=useSuspenseQuery({
    queryKey:['weather',coords],
    queryFn: ()=>getCurrentWeather({lat:coords.lat,lon:coords.lon}),
    retry:false,
 staleTime:1000*60*30
})

  return (
    <Card title='hourlyForecast' childrenClassName='flex gap-6  overflow-x-scroll'>
        {data!.hourly.map(hour=>(
            <div key={hour.dt} className='flex flex-col gap-2 items-center p-2'>
                <p className='whitespace-nowrap'>{new Date(hour.dt*1000).toLocaleTimeString(undefined,{
                    hour:"numeric",
                    minute:"2-digit",
                    hour12:true
                })}</p>
                <WeatherIcon src={hour.weather[0].icon}/>
                <p>{Math.round(hour.temp)}°C</p>
            </div>
        ))}
    </Card>
  )
}