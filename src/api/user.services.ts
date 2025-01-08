import axiosInstance, { handleAxiosError } from "@/utils/axios";
import notify from "@/utils/toast";

const UserService =  {
    getCurrentUser: async (): Promise<object | null> => {
        try {
          const response = await axiosInstance.get("/user");
          if(response.status != 200 && response.status != 201){
              window.location.href= "/auth/login";
              notify("Not unauthorized", "error");
          }
          return response.data;
        } catch  {
          return null;
        }
      },

  updateProfile: async (data: object): Promise<object> => {
    try {
      const response = await axiosInstance.put("/user", data);
      return response.data;
    } catch (err) {
      notify(handleAxiosError(err), "error");
      return {};
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
  
}

export default UserService;