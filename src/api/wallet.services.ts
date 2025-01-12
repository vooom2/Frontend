import axiosInstance, { handleAxiosError } from "@/utils/axios";
import notify from "@/utils/toast";

const WalletServices = {
  setWithdrawalPin: async (data: { pin: string }): Promise<object | null> => {
    try {
      const response = await axiosInstance.post(`/wallet/set-pin`, data);
      return { ...response.data };
    } catch (error) {
      notify(handleAxiosError(error), "error");
      return null;
    }
  },

  initiateWithdrawal: async (data: {
    ammount: string;
    bank_account_id: string;
    withdrawal_pin: string;
  }): Promise<object | null> => {
    try {
      const response = await axiosInstance.post(`/user/owner/withdraw`, data);
      return { ...response.data };
    } catch (error) {
      notify(handleAxiosError(error), "error");
      return null;
    }
  },

 


};

export default WalletServices;
