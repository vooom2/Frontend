import axiosInstance from "@/utils/axios";

const RiderServices = {
  getDashboardStat: async () => {
    try {
      const response = await axiosInstance.get("/user/rider/dashboard-stats");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  getComplaints: async () => {
    try {
      const response = await axiosInstance.get("/user/rider/complaints/get?page=1&limit=10");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  getPayments: async ():Promise<object | null> => {
    try {
      const response = await axiosInstance.get("/user/rider/payments");
      return {...response.data};
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default RiderServices;
