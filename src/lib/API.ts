import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 20000,
});

API.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let value = "";
    if (typeof window !== "undefined") {
      value = localStorage.getItem("token") || "";
    }
    console.log(value);
    config.headers.Authorization = "Bearer " + value;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
