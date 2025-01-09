import { create } from "zustand";

interface FleetManager {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  avatar: string;
  state: string;
}

interface FleetManagersStore {
  managers?: FleetManager[] | null;
  currentManager: FleetManager | null;
  setManagers: (user: FleetManager[]) => void;
  setCurrentUser: (user: FleetManager) => void;
}

export const useFleetManagersStore = create<FleetManagersStore>((set) => ({
  managers: null,
  currentManager: null,
  setManagers: (data: FleetManager[]) =>
    set({
      managers: data,
    }),
  setCurrentUser: (user) =>
    set(() => ({
      currentManager: user,
    })),
}));

export default useFleetManagersStore;