import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesProvider";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  const [mapPostion, setMapPosition] = useState([29.9537564, 31.5370003]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPostion,
    getPosition,
  } = useGeolocation();

 const [mapLat,mapLng] = useUrlPosition();


  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(()=> {
    if(geoLocationPostion) setMapPosition([geoLocationPostion.lat, geoLocationPostion.lng])
  },[geoLocationPostion])

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>{isLoadingPosition ? "Loading..." : "Get Your Postion"}</Button>
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
        <ChangeCenter position={mapPostion} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
