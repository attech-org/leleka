import axios from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";

const URI = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
  baseURL: URI,
  headers: {
    "Content-Type": "application/json",
  },
});

function getRefreshToken() {
  return instance.post("/api/auth/refresh", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
}

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Access Token was expired
      const decoder = jwt_decode<JwtPayload>(token);
      if (decoder.exp) {
        if (Date.now() >= decoder.exp * 1000 - 10000) {
          localStorage.setItem("accessToken", "");
          const rs = await getRefreshToken();
          const { accessToken } = rs.data;
          localStorage.setItem("accessToken", accessToken);
          if (config.headers) {
            config.headers.Authorization = "Bearer " + accessToken;
          }
          // instance.defaults.headers.common.Authorization = "Bearer " + accessToken;
        } else if (config.headers) {
          config.headers.Authorization = "Bearer " + token;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/api/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await getRefreshToken();
          const { accessToken } = rs.data;
          localStorage.setItem("accessToken", accessToken);
          return await instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export const testAuthorized = async () => {
  try {
    const res = await instance.get("/api/testAuthorized");
    console.warn(res.data);
  } catch (err) {
    console.warn(err);
  }
};

export default instance;
