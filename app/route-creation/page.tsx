"use client";

import { useStore } from "@/store";
import { useToast, Text } from "@chakra-ui/react";

import {
  AdvancedMarker,
  Pin,
  Marker,
  useMap,
  useMapsLibrary,
  APIProvider,
  Map,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
type TPosition = {
  lat: number;
  lng: number;
};

const mapId = process.env.NEXT_PUBLIC_MAP_ID;

const FooMap = () => {
  const map = useMap();
  const maps = useMapsLibrary("maps");
  const { positions } = useStore();
  const [userPosition, setUserPosition] = useState<TPosition | null>(null);
  const toast = useToast();

  // Kullanıcının konumunu alıyoruz
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user position:", error);
          toast({
            title: "HATA! Lütfen konuma izin veriniz",
            status: "error",
            isClosable: true,
          });
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Konumları kullanıcıya göre sıralama ve rota oluşturma
  useEffect(() => {
    if (map && maps && userPosition) {
      // Mesafeyi hesaplamak için haversine formülü kullanıyoruz
      const haversineDistance = (coords1: TPosition, coords2: TPosition) => {
        const toRad = (x: number) => (x * Math.PI) / 180;

        const lat1 = coords1.lat;
        const lon1 = coords1.lng;
        const lat2 = coords2.lat;
        const lon2 = coords2.lng;

        const R = 6371; // km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      // Konumları kullanıcıya göre sıralama
      const sortedPositions = [...positions].sort((a, b) => {
        const distanceA = haversineDistance(userPosition, a.position);
        const distanceB = haversineDistance(userPosition, b.position);
        return distanceA - distanceB;
      });

      const flightPlanCoordinates = [
        userPosition,
        ...sortedPositions.map((position) => position.position),
      ];

      const flightPath = new maps.Polyline({
        path: flightPlanCoordinates,
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      flightPath.setMap(map);
    }
  }, [map, maps, userPosition, positions]);

  if (!maps || !userPosition) {
    return null;
  }

  return (
    <Map
      defaultZoom={12}
      defaultCenter={userPosition}
      style={{ width: "100vw", height: "100vh" }}
      gestureHandling={"greedy"}
      mapId={mapId}
    >
      {userPosition && (
        <AdvancedMarker position={userPosition}>
          <Pin></Pin>
        </AdvancedMarker>
      )}
      {positions.map((item) => (
        <MarkerWText key={item.id} position={item}></MarkerWText>
      ))}
    </Map>
  );
};

const MarkerWText = ({ position }: { position: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AdvancedMarker
        position={position.position}
        onClick={() => setOpen(true)}
      >
        <Pin
          background={position.color}
          borderColor={position.color}
          glyphColor={"#FFFFFF"}
        />
      </AdvancedMarker>
      {open && (
        <InfoWindow
          position={position.position}
          onCloseClick={() => setOpen(false)}
        >
          <Text>{position.name}</Text>
          <Text>Enlem: {position.position.lat}</Text>
          <Text>Boylam: {position.position.lng}</Text>
        </InfoWindow>
      )}
    </>
  );
};

const Page = () => {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  return (
    <>
      {apiKey && (
        <APIProvider apiKey={apiKey}>
          <FooMap />
        </APIProvider>
      )}
    </>
  );
};

export default Page;
