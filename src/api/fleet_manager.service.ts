import axiosInstance, { handleAxiosError } from "@/utils/axios";
import notify from "@/utils/toast";

const FleetManagerServices = {
  getFleetManagers: async () => {
    try {
      const response = await axiosInstance.get("/fleet-managers");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  submitComplaint: async (data: ComplaintFormData):Promise<object | null> => {
    try {
      console.log(data);
      const response = await axiosInstance.post("/user/rider/complaints", data);
      return {...response.data};
    } catch (error) {
      notify(handleAxiosError(error), "error");
      return null;
    }
  },
};


type ComplaintFormData = {
  category: string;
  date: string;
  time: string;
  fleetManager: string;
  location: string;
  detail: string;
  images: string[];
};


export default FleetManagerServices;
