import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function MapViewer({ coordinates }: any) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(coordinates);
    }
  }, [coordinates]);

  return (
    <MapContainer
      center={coordinates}
      zoom={17}
      scrollWheelZoom={false}
      zoomControl={false}
      ref={mapRef}
      className="MapContainer"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapViewer;

const myIcon = new L.Icon({
  iconUrl:
    "https://img.uxwing.com/wp-content/themes/uxwing/download/location-travel-map/map-pin-icon.svg",
  iconSize: [38, 38],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});
