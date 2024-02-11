/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

export interface ReccommendedSpotsMarker {
  markerLanLng: [number, number];
  label: string;
}

interface Props {
  centerMarker: [number, number];
  recommendedSpots?: ReccommendedSpotsMarker[];
}

const Map = (props: Props) => {
  const { centerMarker, recommendedSpots } = props;

  return (
    <MapContainer
      center={centerMarker ? centerMarker : [(51.5, -0.09)]}
      zoom={11}
      scrollWheelZoom={false}
      css={EmotionStyle.mainMapWrapper}
    >
      {/* 地理タイル */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker */}
      <Marker position={centerMarker ? centerMarker : [(51.5, -0.09)]}>
        <Popup>あなたの現在地🌟</Popup>
      </Marker>
      {recommendedSpots &&
        recommendedSpots.map((spot, index) => {
          return (
            <Marker key={index} position={spot.markerLanLng}>
              <Popup>{spot.label}</Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

/** EmotionStyle */
const EmotionStyle = {
  mainMapWrapper: css`
    width: 100%;
    height: 400px;
  `,
};

export default Map;
