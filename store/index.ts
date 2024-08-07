import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LatLngLiteral } from "leaflet";
import { TPosition } from "@/models/TPosition";

type TStore = {
  positions: Array<TPosition & { id: string }>;
  addPosition: (position: TPosition & { id: string }) => void;
};

type TPositionStore = {
  name: string;
  color: string;
  position?: LatLngLiteral;
  setName: (name: string) => void;
  setColor: (color: string) => void;
  setPosition: (position: LatLngLiteral) => void;
};

export const usePositionStore = create<TPositionStore>()((set) => ({
  name: "",
  color: "#000000",
  position: undefined,
  setName: (name: string) => set((state) => ({ name })),
  setColor: (color: string) => set((state) => ({ color })),
  setPosition: (position: LatLngLiteral) => set((state) => ({ position })),
}));

export const useStore = create<TStore>()(
  persist(
    (set) => ({
      positions: [],
      addPosition: (position) =>
        set((state) => ({ positions: [...state.positions, position] })),
    }),
    {
      name: "positions-store",
    }
  )
);
