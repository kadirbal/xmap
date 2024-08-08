import { APIProvider, Map, MapMouseEvent } from "@vis.gl/react-google-maps";
import { LatLngLiteral } from "leaflet";

const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
const mapId = process.env.NEXT_PUBLIC_MAP_ID;

const BaseMap = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (bar: LatLngLiteral) => void;
}) => {
  function handleClick(event: MapMouseEvent): void {
    const pos = event.detail.latLng;
    onClick && pos && onClick(pos);
  }

  return (
    <>
      {apiKey && (
        <APIProvider apiKey={apiKey}>
          <Map
            style={{ width: "100vw", height: "100vh" }}
            defaultZoom={3}
            defaultCenter={{ lat: 0, lng: 0 }}
            gestureHandling={"greedy"}
            mapId={mapId}
            onClick={handleClick}
          >
            {children}
          </Map>
        </APIProvider>
      )}
    </>
  );
};

export default BaseMap;
