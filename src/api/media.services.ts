/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ACCESS_TOKEN } from "@/utils/appstrings";
import axiosInstance, { handleAxiosError } from "@/utils/axios";
import notify from "@/utils/toast";

const MediaServices = {
  uploadSingleFile: async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axiosInstance.post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem(USER_ACCESS_TOKEN)}`,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      notify(handleAxiosError(err), "error");
    }
  },
};

export default MediaServices;
