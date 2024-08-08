"use client";

import { useStore } from "@/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import {
  Button,
  Grid,
  GridItem,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import LocationForm from "./LocationForm";
import NextLink from "next/link";
import BaseMap from "./BaseMap";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { LatLngLiteral } from "leaflet";
import { TPosition } from "@/models/TPosition";

const Foo = () => {
  const { positions: _positions, addPosition, updatePosition } = useStore();
  const { id: _id } = useParams();

  const toast = useToast();

  const [id, setID] = useState<string>();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [position, setPosition] = useState<LatLngLiteral>();

  useEffect(() => {
    const _position = _positions.find((position) => position.id === _id);

    if (_position) {
      setID(_position.id);
      setName(_position.name);
      setColor(_position.color);
      setPosition(_position.position);
    }
  }, [_positions]);

  function handleSave(): void {
    const bar = {
      id: _id ? _id : nanoid(4),
      name,
      color,
      position,
    } as TPosition & {
      id: string;
    };

    const toastCfg = {
      title: "İşlem Başarılı",
      duration: 5000,
      isClosable: true,
      // status: "error",
    };

    if (color && name && position) {
      _id ? updatePosition(bar) : addPosition(bar);
      toast({ ...toastCfg, status: "success" });
    } else {
      toast({ ...toastCfg, title: "Hata", status: "error" });
      return;
    }
  }

  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)" }}
        gap={4}
      >
        <GridItem colSpan={{ base: 1, md: 3 }} p={{ base: 4, md: 16 }}>
          <Stack spacing={{ base: 2, md: 8 }}>
            <Link as={NextLink} href="/">
              <Button variant={"link"}>Anasayfaya dön</Button>
            </Link>
            <LocationForm
              name={name}
              color={color}
              onNameChange={(name) => setName(name)}
              onColorChange={(color) => setColor(color)}
              onSave={handleSave}
            ></LocationForm>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 9 }}>
          {/* <GoogleMap
            position={position}
            onClickMap={(pos) => setPosition(pos)}
            color={color}
          ></GoogleMap> */}

          <BaseMap onClick={(pos) => setPosition(pos)}>
            {position && (
              <AdvancedMarker position={position}>
                <Pin
                  background={color}
                  borderColor={color}
                  glyphColor={"#FFFFFF"}
                ></Pin>
              </AdvancedMarker>
            )}
          </BaseMap>
        </GridItem>
      </Grid>
    </>
  );
};

export default Foo;
