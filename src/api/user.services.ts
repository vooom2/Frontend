import axiosInstance from "@/utils/axios";
import notify from "@/utils/toast";

const UserService =  {
    getCurrentUser: async (): Promise<object> => {
        try {
          const response = await axiosInstance.get("/user");
          if(response.status != 200 && response.status != 201){
              window.location.href= "/auth/login";
              notify("Not unauthorized", "error");
          }
          return response.data;
        } catch (err) {
          console.log(err);
          return{};
        }
      },

  updateProfile: async (data: object): Promise<object> => {
    try {
      const response = await axiosInstance.put("/user", data);
      return response.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  
}

export default UserService;