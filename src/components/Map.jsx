import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPostion, setMapPosition] = useState({ lat: 40, lng: 0 });
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // const navigate = useNavigate();

  return (
    <div
      className={styles.mapContainer}
      // onClick={() => {
      //   navigate("form");
      // }}
    >
     <MapContainer center={mapPostion} zoom={13} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    <Marker position={mapPostion}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
    </div>
  );
}
