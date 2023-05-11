import axios from "axios";

import store from "@/store";

import { getAccessToken } from "@/utils/auth";
import router from "../router";

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    let accessToken = getAccessToken();
    if (accessToken != null) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response;
    if (
      response.status != 200 ||
      response.status != 201 ||
        response.status != 204 ||
        response.status != 302
    ) {
      return res.data;
    } else {
      return Promise.reject(new Error(res.message || "Error"));
    }
  },
  (error) => {
    if (error.response.status && error.response.status == 401) {
      return logout();
    }
    return Promise.reject(error.response);
  }
);
function logout() {
  return router.push({ name: "Login" });
}

export default service;
