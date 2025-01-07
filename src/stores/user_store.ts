/* eslint-disable @typescript-eslint/no-explicit-any */
import UserService from "@/api/user.services";
import { create } from "zustand";

type UserStore = {
  userInfo?: {
    rider_rating: {
      payment_reliability: string;
      default_history: string;
    };
    _id: string;
    account_type: string;
    full_name: string;
    email: string;
    phone_number: number;
    password: string | null;
    gender: string;
    email_verified: boolean;
    number_verified: boolean;
    account_verified: boolean;
    account_active: boolean;
    protection_plan_subscription: any;
    vehicle: any;
    missed_payments: number;
    verification_documents: any[];
    guarantor_documents: any[];
    createdAt: string;
  withdrawal_pin: string | null;
  wallet: any;
  };
  updateInfo: (info: UserStore['userInfo']) => void;
  getInfo: () => Promise<void>;
};

const useUserStore = create<UserStore>((set) => ({
  userInfo:  undefined,
  updateInfo: (info) => {
    set({ userInfo: info });
  },
  getInfo: async () => {
    const response: any = await UserService.getCurrentUser();
    if (response.data["okay"]) {
      set({ userInfo: response.data["profile"] });
    }
  },
}));


export default useUserStore;