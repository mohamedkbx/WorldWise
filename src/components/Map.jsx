import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../context/CitiesProvider";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPostion, setMapPosition] = useState({ lat: 40, lng: 0 });

  const mapLat = searchParams.get("lat") || 29.9537564;
  const mapLng = searchParams.get("lng") || 31.5370003;

  const { cities } = useCities();

  // const navigate = useNavigate();

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
        <ChangeCenter position={[mapLat, mapLng]} setMapPosition={setMapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position , setMapPosition}) {
       const map = useMap()
       map.setView(position)
       setMapPosition(position)
       return null
}