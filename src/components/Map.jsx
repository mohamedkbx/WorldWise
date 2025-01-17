import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesProvider";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPostion, setMapPosition] = useState([29.9537564, 31.5370003]);

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  const { cities } = useCities();

  // const navigate = useNavigate();
   useEffect(()=>{
    if(mapLat && mapLng)
    setMapPosition([mapLat , mapLng ])
   },[mapLat,mapLng])

  return (
    <div
      className={styles.mapContainer}
      // onClick={() => {
      //   navigate("form");
      // }}
    >
      <MapContainer
        center={mapPostion}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position?.lat, city.position?.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span> </span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={[mapLat || 29.9537564, mapLng || 31.5370003]} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
