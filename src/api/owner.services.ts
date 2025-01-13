import axiosInstance from "@/utils/axios";
import notify from "@/utils/toast";

const OwnerServices = {
  getDashboardStats: async (): Promise<object | null> => {
    try {
      const response = await axiosInstance.get("/user/owner/dashboard");
      if (response.status != 200 && response.status != 201) {
        window.location.href = "/auth/login";
        notify("Not unauthorized", "error");
      }
      return response.data;
    } catch {
      return null;
    }
  },

  hostVehicle: async (data: {
    [key: string]: string | number;
  }): Promise<object | null> => {
    try {
      const response = await axiosInstance.post(
        "/user/owner/host-vehicle",
        data
      );
      if (response.status != 200 && response.status != 201) {
        window.location.href = "/auth/login";
        notify("Not unauthorized", "error");
      }
      return response.data;
    } catch {
      return null;
    }
  },
};

export default OwnerServices;
