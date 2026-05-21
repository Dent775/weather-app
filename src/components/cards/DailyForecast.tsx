import { useSuspenseQuery } from '@tanstack/react-query'

import { getCurrentWeather } from '../../api'
import Card from './Cards'
import WeatherIcon from '../WeatherIcon'
import type { Coords } from '../../types'

type Props = {
    coords: Coords
}

export default function CurrentWeather({ coords }: Props) {

    const { data } = useSuspenseQuery({
        queryKey: ['weather', coords],
        queryFn: () => getCurrentWeather({ lat: coords.lat, lon: coords.lon }),
        retry: false,
        staleTime: 1000 * 60 * 30
    })

    return (
        <Card title="daily forecast" childrenClassName='flex flex-col gap-4 2xl:justify-between'>

            {data!.daily.map(day => (
                <div key={day.dt} className='flex justify-between'>
                    <p className='w-9'>{new Date(day.dt * 1000).toLocaleString(undefined, { weekday: "short" })}</p>
                    <WeatherIcon src={day.weather[0].icon} />
                    <p>{Math.round(day.temp.day)}°C</p>
                    <p className='text-gray-500/75'>{Math.round(day.temp.min)}°C</p>
                    <p className='text-gray-500/75'>{Math.round(day.temp.max)}°C</p>
                </div>
            ))}

        </Card>
    )
}