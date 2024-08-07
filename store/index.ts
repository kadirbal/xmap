import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LatLngLiteral } from "leaflet";
import { TPosition } from "@/models/TPosition";

type TStore = {
  positions: Array<TPosition & { id: string }>;
  addPosition: (position: TPosition & { id: string }) => void;
  updatePosition: (position: TPosition & { id: string }) => void;
};

export const useStore = create<TStore>()(
  persist(
    (set) => ({
      positions: [],
      addPosition: (position) =>
        set((state) => ({ positions: [...state.positions, position] })),
      updatePosition: (position) =>
        set((state) => {
          const np = [...state.positions]; // as new positions
          const index = np.findIndex((item) => item.id === position.id);
          np[index] = position;
          return { positions: np };
        }),
    }),
    {
      name: "positions-store",
    }
  )
);
