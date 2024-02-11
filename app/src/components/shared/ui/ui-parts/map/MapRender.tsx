import dynamic from "next/dynamic";
import React from "react";
import { ReccommendedSpotsMarker } from "./Map";

interface Props {
  centerMarker: [number, number];
  recommendedSpots?: ReccommendedSpotsMarker[];
}

const MapRender = (props: Props) => {
  const { centerMarker, recommendedSpots } = props;

  console.log("centerMarker", centerMarker);
  console.log("recommendedSpots", recommendedSpots);

  const Map = React.useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <Map centerMarker={centerMarker} recommendedSpots={recommendedSpots} />
  );
};

export default MapRender;
