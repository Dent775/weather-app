import React from 'react'
import Card from './Cards'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getCurrentWeather } from "../../api"
import Sunrise from '/src/assets/sunrise.svg?react'
import Sunset from '/src/assets/sunset.svg?react'
import Pressure from '/src/assets/pressure.svg?react'
import Uv from '/src/assets/uv.svg?react'
import Cloud from '/src/assets/cloud.svg?react'
import type { Coords } from '../../types'

type Props = { coords: Coords }

export default function AdditionalInfo({ coords }: Props) {

    const { data } = useSuspenseQuery({
        queryKey: ['weather', coords],
        queryFn: () => getCurrentWeather({ lat: coords.lat, lon: coords.lon }),
        retry: false,
        staleTime: 1000 * 60 * 30
    })

    return (
        <Card title="Additional Weather Info" childrenClassName='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {
                rows.map(({ label, value, Icon }) => (
                    <div className='flex justify-between' key={value}>
                        <div className='flex gap-4'>
                            <span className='text-gray-400'>{label}</span>
                            <Icon className='size-6 invert' />
                        </div>
                        <span>
                            <FormatComponent value={value} number={data!.current[value]} timezone={data!.timezone} />
                        </span>
                    </div>
                ))
            }
        </Card>)
}

function FormatComponent({ value, number, timezone }: { value: string, number: number, timezone: string }) {
    if (value === "sunrise" || value === "sunset")
        return new Date(number * 1000).toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: timezone
        })
    return number
}

const rows = [
    {
        label: "Cloudiness %",
        value: "clouds",
        Icon: Cloud
    },
    {
        label: "UV Index",
        value: "uvi",
        Icon: Uv
    },
    {
        label: "Pressure (hPa)",
        value: "pressure",
        Icon: Pressure
    },
    {
        label: "Sunrise",
        value: "sunrise",
        Icon: Sunrise
    },
    {
        label: "Sunset",
        value: "sunset",
        Icon: Sunset
    },
] as const