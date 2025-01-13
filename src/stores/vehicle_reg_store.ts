/* eslint-disable @typescript-eslint/no-explicit-any */
import UserService from "@/api/user.services";
import { create } from "zustand";

type vehicleRegStore = {
  vehicleInfo?: {
    documents: {
      vio: string;
      amac: string;
      lga: string;
      insurance: string;
      receipt: string;
    };
  };
  updateInfo: (info: vehicleRegStore["vehicleInfo"]) => void;
  getInfo: () => Promise<void>;
  saveVehicleDetails: (info: vehicleRegStore["vehicleInfo"]) => void;
};

const useVehicleRegStore = create<vehicleRegStore>((set) => ({
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

export default useVehicleRegStore;
