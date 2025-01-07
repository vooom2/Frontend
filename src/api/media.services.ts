/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios";

const MediaServices = {
    uploadSingleFile: async (file: any) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axiosInstance.post("/media/upload", formData);
            return response.data;
        } catch (err) {
            console.log(err);
            return {};
        }
    }
}

export default MediaServices;