"use client";

import { TPosition } from "@/models/TPosition";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { LatLngLiteral } from "leaflet";
import { useState } from "react";

const GoogleMap = ({
  position = undefined,
  color,
  onClickMap,
}: {
  position: TPosition | undefined;
  color: string;
  onClickMap: (pos) => void;
}) => {
  // ISTANBUL coordinates
  const DEFAULT_CENTER = {
    lat: position?.position?.lat ? position?.position?.lat : 41.0082,
    lng: position?.position?.lng ? position?.position?.lng : 28.9784,
  };

  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_MAP_ID;

  return (
    apiKey && (
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultZoom={3}
          defaultCenter={DEFAULT_CENTER}
          gestureHandling={"greedy"}
          mapId={mapId}
          onClick={(e) => onClickMap(e.detail.latLng)}
        >
          {position && (
            <AdvancedMarker position={position}>
              {/* bg = border, gliph #FF */}
              <Pin
                background={color}
                borderColor={color}
                glyphColor={"#FFFFFF"}
              ></Pin>
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
    )
  );
};

export default GoogleMap;
