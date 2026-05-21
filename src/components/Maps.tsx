import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { latLng } from 'leaflet'
import type { Coords } from '../types'
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const API_KEY = import.meta.env.VITE_API_KEY;
const Map_Tiler_Key = import.meta.env.VITE_MAP_TILER_KEY;

type Props = {
  coords: Coords
  onMapClick: (lat: number, lon: number) => void
  mapType: string
}

export default function Maps({ coords, onMapClick, mapType }: Props) {
  const { lat, lon } = coords
  return (
    <MapContainer center={[lat, lon]} zoom={5} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }}>
      <MapClick onMapClick={onMapClick} coords={coords} />
      <MapTileLayer />
      {mapType !== "Default" && <TileLayer url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`} />}

      {mapType === "Satellite" && <TileLayer url={`https://api.maptiler.com/maps/hybrid-v4/{z}/{x}/{y}.jpg?key=${Map_Tiler_Key}`} />}
      <Marker position={[lat, lon]}>

      </Marker>
    </MapContainer>
  )
}

function MapClick({ onMapClick, coords }: { onMapClick: (lat: number, lon: number) => void, coords: Coords }) {
  const map = useMap()
  map.panTo([coords.lat, coords.lon])
  map.on('click', (e) => {
    const { lat, lng } = e.latlng

    onMapClick(lat, lng)
  })

  return null
}

function MapTileLayer() {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({ style: 'basic-dark', apiKey: Map_Tiler_Key })
    tileLayer.addTo(map);
    return () => { map.removeLayer(tileLayer) }
  }, [map])

  return null
}