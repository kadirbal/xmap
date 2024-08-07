"use client";

import { TPosition } from "@/models/TPosition";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { ChangeEvent } from "react";

const LocationForm = ({
  name,
  color,
  onColorChange,
  onNameChange,
  onSave,
}: {
  name: string;
  color: string;
  onColorChange: (color: string) => void;
  onNameChange: (name: string) => void;
  onSave: () => void;
}) => {
  return (
    <div>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Konum Adı</FormLabel>
          <Input
            name="name"
            value={name}
            type="text"
            onChange={(e) => onNameChange(e.currentTarget.value)}
            placeContent={"Konum Adi"}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Konum Rengi</FormLabel>
          <Input
            name="color"
            value={color}
            type="color"
            onChange={(e) => onColorChange(e.currentTarget.value)}
            placeContent={"Konum Adi"}
          ></Input>
        </FormControl>
        <Button onClick={onSave}>Kaydet</Button>
      </Stack>
    </div>
  );
};

export default LocationForm;
