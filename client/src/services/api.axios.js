import axios from "axios";
import tokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = tokenService.getLocalAccessToken();
    if (token) {
      config.headers["auth-token"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.request.use(
  (res) => {
    return res;
  },
  async (err) => {
    const config = err.config;

    if (err.response) {
      if (err.response.status === 403 && !config._retry) {
        config._retry = true;

        try {
          const res = await instance.post("/auth/token", {
            refleshToken: tokenService.getLocalRefreshToken(),
          });

          const { accessToken } = res.data;

          tokenService.updateAccessToken(accessToken);

          return instance(config);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
