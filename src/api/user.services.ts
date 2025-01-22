import axiosInstance, { handleAxiosError } from "@/utils/axios";
import notify from "@/utils/toast";

const UserService = {
  getCurrentUser: async (): Promise<object | null> => {
    try {
      const response = await axiosInstance.get("/user");
      if (response.status != 200 && response.status != 201) {
        window.location.href = "/auth/login";
        notify("Not unauthorized", "error");
      }
      return response.data;
    } catch {
      return null;
    }
  },
  getNotifications: async (): Promise<object | null> => {
    try {
      const response = await axiosInstance.get("/user/notifications");
      return response.data;
    } catch {
      return null;
    }
  },
  updateNotification: async (id :string): Promise<object | null> => {
    try {
      const response = await axiosInstance.get(`/user/notifications/${id}`);
      return response.data;
    } catch {
      return null;
    }
  },

  updateProfile: async (data: object): Promise<object | null> => {
    try {
      const response = await axiosInstance.put("/user", data);
      return response.data;
    } catch (err) {
      notify(handleAxiosError(err), "error");
      return null;
    }
  },
  uploadVerification: async (data: object): Promise<object | undefined> => {
    try {
      const response = await axiosInstance.post("/user/get-verified", data);
      return response.data;
    } catch (err) {
      notify(handleAxiosError(err), "error");
      return undefined;
    }
  },

  getRiderVehicle: async (): Promise<object | null> => {
    try {
      const response = await axiosInstance.get("/user/rider/vehicle");
      return { ...response.data };
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getPendingVehicle: async (): Promise<object | null> => {
    try {
      const response = await axiosInstance.get("/user/rider/vehicle/pending");
      return { ...response.data };
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  makeVehicleDownPayment: async (): Promise<object | null> => {
    try {
      const response = await axiosInstance.post(
        "/user/rider/vehicle/downpayment"
      );
      return { ...response.data };
    } catch (error) {
      notify(handleAxiosError(error), "error");
      return null;
    }
  },
  makePayment: async (id: string): Promise<object | null> => {
    try {
      const response = await axiosInstance.post("/user/rider/payments", {
        payment_id: id,
      });
      return { ...response.data };
    } catch (error) {
      notify(handleAxiosError(error), "error");
      return null;
    }
  },

  getBankAccounts: async (): Promise<object | null> => {
    try {
      const response = await axiosInstance.get("/user/owner/banks");
      return { ...response.data };
    } catch (error) {
      notify(handleAxiosError(error), "error");
      return null;
    }
  },

  addBankAccount: async (data: {
    account_number: string;
    account_name: string;
    bank_code: string;
    bank_name: string;
  }): Promise<object | null> => {
    try {
      const response = await axiosInstance.post("/user/owner/banks/add", data);
      return { ...response.data };
    } catch (error) {
      notify(handleAxiosError(error), "error");
      return null;
    }
  },
removeBankAccount: async (id: string): Promise<object | null> => {
    try {
      const response = await axiosInstance.delete(`/user/owner/banks/${id}`);
      return { ...response.data };
    } catch (error) {
      notify(handleAxiosError(error), "error");
      return null;
    }
  },

};
export default UserService;
