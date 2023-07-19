import { axiosInstance } from "./config";

export const apiServices = {
  post: async (endpoint, body) => {
    try {
      const response = await axiosInstance.post(`${endpoint}`, {
        ...body,
      });

      const { data } = response;
      return data;
    } catch (e) {
      console.log("post request error", e);
    }
  },
  get: async (endpoint) => {
    try {
      const response = await axiosInstance.get(`${endpoint}`);
      const { data } = response;
      return data;
    } catch (error) {
      console.log("");
    }
  },
  delete: async (endpoint) => {
    try {
      const response = await axiosInstance.delete(endpoint);
      const { data } = response;
      return data;
    } catch (error) {
      console.log("error occured in delete request", error);
    }
  },
  update: async (endpoint, body) => {
    try {
      const response = await axiosInstance.put(endpoint, {
        ...body,
      });
      const { data } = response;
      return data;
    } catch (error) {
      console.log("error occured in update request", error);
    }
  },
};
