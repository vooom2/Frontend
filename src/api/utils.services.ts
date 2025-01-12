import axiosInstance, { handleAxiosError } from "@/utils/axios";
import notify from "@/utils/toast";

const UtilsServices = {
  getBankLists: async (): Promise<object | null> => {
    try {
      const response = await axiosInstance.get(`/utils/banks`);
      return { ...response.data };
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  resolveAccount: async (data: {
    account_number: string;
    bank_code: string;
    bank_name: string;
  }): Promise<object | null> => {
    try {
      const response = await axiosInstance.post(`/utils/banks/resolve-account`, data);
      return { ...response.data };
    } catch (error) {
      notify(handleAxiosError(error), "error");
      return null;
    }
  },
};

export default UtilsServices;
