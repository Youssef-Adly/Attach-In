import axios from "axios";

const instance = axios.create({
  baseURL: "https://attachin.com/api",
});

instance.interceptors.request.use(
  function (config) {
    const token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).Auth
    ).token;

    // if (token) axios.defaults.headers.common["auth-token"] = token;
    if (token) config.headers.Authorization = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
