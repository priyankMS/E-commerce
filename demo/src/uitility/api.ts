  import axios from "axios";
  import { store } from "../redux/store";
  import { logout } from "../redux/slice/AuthSlice";

  const api = axios.create({
    baseURL: "http://localhost:4040/auth",
  });

  api.interceptors.request.use(
    (config) => {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  //for refreshtoken
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refresh_token");
        try {
          const response = await api.post("/refreshToken", {
            token: refreshToken,
          });
          const { access_token } = response.data;
          localStorage.setItem("accessToken", access_token);
          api.defaults.headers["Authorization"] = `Bearer ${access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  export default api;
