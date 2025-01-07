/* eslint-disable @typescript-eslint/no-unused-vars */
import { USER_ACCESS_TOKEN } from "@/utils/appstrings";
import axiosInstance, { handleAxiosError } from "@/utils/axios";
import notify from "@/utils/toast";
import { UserInfo } from "os";
import UserService from "./user.services";

interface LoginResponse {
  token: string;
  user: {
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
    const response = await axiosInstance.post(`/auth/${userRole}/register`, data);
    localStorage.setItem(USER_ACCESS_TOKEN, response.data.token);
    return response.data;
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
    localStorage.setItem(USER_ACCESS_TOKEN, response.data.token);
    return response.data;
  },

  authenticate: async() => {
    const getToken = localStorage.getItem(USER_ACCESS_TOKEN);
    if(!getToken){
      window.location.href= "/auth/login";
      notify("Not unauthorized", "error");
    }
    await UserService.getCurrentUser();
  },
  
  logout: (): void => {
    localStorage.removeItem(USER_ACCESS_TOKEN)
    window.location.href = "/auth/login";
  },

 
};

export default AuthService;
