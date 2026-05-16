import { useQuery } from "@tanstack/react-query"
import { getCurrentWeather, getGeocode} from "./api"
import Card from "./components/cards/Cards";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Maps from "./components/Maps";
import { useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";


function App() {

  const [coordinates,setCoordinates]=useState<Coords>({lat:31,lon:76})

  const onMapClick=(lat:number,lon:number)=>{
      setCoordinates({lat,lon})
      setLocation("custom")
  }

  const [location,setLocation]=useState("Delhi")
  const [mapType,setMapType]=useState("clouds_new")

  const{data:geocodeData}=useQuery({
    queryKey:["geocode",location],
    queryFn:()=>getGeocode(location),
  })
  
  const coords=location==="custom"?coordinates:{lat:geocodeData?.[0].lat??0,lon:geocodeData?.[0].lon??0}

    return<>
    <div className="flex gap-8">
      <div className="flex gap-4 items-center">
        <h1 className="text-large font-bold">Location:</h1>
        <LocationDropdown location={location} setLocation={setLocation}/>
      </div>
      <div className="flex gap-4 items-center">
        <h1 className="text-large font-bold">Map Type:</h1>
        <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
      </div>
    </div>
    <Maps coords={coords} onMapClick={onMapClick} mapType={mapType}/>
    <CurrentWeather coords={coords}/>
    <HourlyForecast coords={coords}/>
    <DailyForecast  coords={coords}/>
    <AdditionalInfo coords={coords}/>
    </>
    
}

export default App
