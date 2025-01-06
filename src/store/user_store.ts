/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthService from "@/api/auth.services";
import { create } from "zustand";

type UserStore = {
  userInfo: object;
  updateInfo: (info: object) => void;
  getInfo: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  userInfo: {},
  updateInfo: (info) => {
    set(() => ({ userInfo: info }));
  },
  getInfo: async () => {
    const response: any = await AuthService.getCurrentUser();
    if (response.data["okay"]) {
      set({ userInfo: response.data["profile"] });
    }
  },
}));
