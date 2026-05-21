import React, { type Dispatch, type SetStateAction } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  mapType: string
  setMapType: Dispatch<SetStateAction<string>>
}

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-full xs:w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className='z-1001'>
        <SelectGroup>
          {popularCities.map(city => (
            <SelectItem key={city} value={city} className='capitalize'>
              {city.split('_')[0]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const popularCities = [
  "Default",
  "Satellite",
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new"
];