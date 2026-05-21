import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { getGeocode } from "./api";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import Maps from "./components/Maps";
import MobileHeader from "./components/MobileHeader";
import SidePanel from "./components/SidePanel";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import type { Coords } from "./types";
import Hamburger from "/src/assets/hamburger.svg?react";

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({ lat: 31, lon: 76 });

  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
    setLocation("custom");
  };

  const [location, setLocation] = useState("Delhi");
  const [mapType, setMapType] = useState("Default");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });

  const coords =
    location === "custom"
      ? coordinates
      : { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 };

  return (
    <>
      <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
      <div className="flex flex-col gap-3 xs:gap-8 p-2 xs:p-6 w-full lg:w-[calc(100vw-var(--sidebar-width))] 2xl:h-auto ">
        <div className="flex flex-col gap-4 xs:flex-row xs:gap-8">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-large font-bold">Location:</h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-large font-bold whitespace-nowrap">Map Type:</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <button className="ml-auto hidden xs:block" onClick={() => setIsSidePanelOpen(true)}>
            <Hamburger className="size-6 invert rounded-md lg:hidden" />
          </button>
        </div>
        <div className="grid grid-cols-1 2xl:flex-1  md:grid-cols-2 gap-4 2xl:grid-cols-4 2xl:grid-rows-4  ">
          <div className="relative h-[30rem] 2xl:h-auto md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
            <Maps coords={coords} onMapClick={onMapClick} mapType={mapType} />
          </div>
          <div className="col-span-1 2xl:row-span-2 order-2">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 order-3 2xl:row-span-2 2xl:order-4">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>

          <div className="md:col-span-2 2xl:row-span-1 order-5">
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>
        </div>
      </div>
      <SidePanel coords={coords} isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen} />
    </>
  );
}

export default App;
