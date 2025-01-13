/* eslint-disable @typescript-eslint/no-explicit-any */
import UserService from "@/api/user.services";
import { create } from "zustand";

type vehicleDeetStore = {
  vehicleInfo?: {
    make: string;
    model: string;
    state: string;
    lga: string;
    color: string;
    vehicle_number: string;
    chasis_state: string;
    initial_mileage: number;
  };
  updateInfo: (info: vehicleDeetStore["vehicleInfo"]) => void;
  getInfo: () => Promise<void>;
  saveVehicleDetails: (info: vehicleDeetStore["vehicleInfo"]) => void;
};

const useVehicleDeetStore = create<vehicleDeetStore>((set) => ({
  vehicleInfo: undefined,
  updateInfo: (info) => {
    set({ vehicleInfo: info });
  },
  getInfo: async () => {
    const response: any = await UserService.getCurrentUser();
    if (response.data["okay"]) {
      set({ vehicleInfo: response.data["profile"] });
    }
  },

  saveVehicleDetails: (info) => {
    set({ vehicleInfo: info });
  },
}));

export default useVehicleDeetStore;
