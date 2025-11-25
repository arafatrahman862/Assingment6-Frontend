import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});


axiosInstance.interceptors.request.use(

  function (config) {
    console.log("Axios", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);



let isRefreshing = false

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = []


const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(null)
    }
  })

  pendingQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Res Success!")
    return response
  },

  async (error) => {

    const originalRequest = error.config as AxiosRequestConfig & {_retry: boolean};
    console.log(originalRequest)

    console.log("Request Failed", error.response)

    if (error.response.status === 500 && error.response.data.message === "jwt expired" && !originalRequest._retry) {
      console.log("Your Token Is Expired")

      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject })
        }).then(() => axiosInstance(originalRequest)).catch(error => Promise.reject(error))
      }

      isRefreshing = true

      try {
        const res = await axiosInstance.post("/auth/refresh-token")
        console.log("New Token Arrived", res)

        processQueue(null)

        return axiosInstance(originalRequest)
      } catch (error) {
        console.log(error)


        processQueue(error)

        return Promise.reject(error)
      } finally{
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
);