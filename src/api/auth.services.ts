/* eslint-disable @typescript-eslint/no-unused-vars */
import { USER_ACCESS_TOKEN } from "@/utils/appstrings";
import axiosInstance, { handleAxiosError } from "@/utils/axios";
import notify from "@/utils/toast";
import UserService from "./user.services";

interface LoginResponse {
  token: string;
  profile: {
    id: string;
    name: string;
    email: string;
    _id: string;
    account_type: string;
    full_name: string;
    phone_number: number;
    password: string | null;
    withdrawal_pin: string | null;
    email_verified: boolean;
    number_verified: boolean;
    account_verified: boolean;
    account_active: boolean;
    gender: string;
    protection_plan_subscription: unknown | null;
    wallet: unknown | null;
    verification_documents: unknown[];
    createdAt: string;
  };
  userType: string;
}

interface RegisterData {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const AuthService = {
  register: async (data: RegisterData, userRole: string): Promise<void> => {
    const response = await axiosInstance.post(
      `/auth/${userRole}/register`,
      data
    );
    localStorage.setItem(USER_ACCESS_TOKEN, response.data.token);
    return response.data;
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      data
    );
    if (response.data.profile.email_verified) {
      console.log("Email verified");
      localStorage.setItem(USER_ACCESS_TOKEN, response.data.token);
    }
    return response.data;
  },
  forgotPassword: async (data: object): Promise<object | null> => {
   try {
     const response = await axiosInstance.post(
       "/auth/pwreset",
       data
     );
     return response.data;
   } catch (error) {
    notify(handleAxiosError(error), "error");
    return null;
   }
  },

  setPassword: async (data: object): Promise<object | null> => {
    try {
      const response = await axiosInstance.post(
        "/auth/pwreset-new",
        data
      );
      return response.data;
    } catch (error) {
     notify(handleAxiosError(error), "error");
     return null;
    }
   },

  verifyEmail: async (data: object): Promise<object | null> => {
    try {
      console.log(data);
      const response = await axiosInstance.post(
        "/auth/verify-otp",
        data
      );
      return response.data;
    } catch (error) {
     notify(handleAxiosError(error), "error");
     return null;
    }
   },


  authenticate: async () => {
    const getToken = localStorage.getItem(USER_ACCESS_TOKEN);
    if (!getToken) {
      window.location.href = "/auth/login";
      notify("Not unauthorized", "error");
    }
    await UserService.getCurrentUser();
  },

  changePassword: async (data: {
    oldPassword: string;
    newPassword: string;
  }): Promise<object | null> => {
    try {
      const response = await axiosInstance.put("/auth/change-password", data);
      return { ...response.data };
    } catch (error) {
      notify(handleAxiosError(error), "error");
      return null;
    }
  },

  logout: (): void => {
    localStorage.removeItem(USER_ACCESS_TOKEN);
    window.location.href = "/auth/login";
  },
};

export default AuthService;
