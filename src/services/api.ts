import axios from "axios";

function getLocalAccessToken() {
  return localStorage.getItem("accessToken");
}

const getLocalRefreshToken = () => {
  localStorage.getItem("refreshToken");
};

const updateLocalAccessToken = (accessToken: string): void => {
  localStorage.setItem("accessToken", accessToken);
};

const instance = axios.create({
  baseURL: "http://localhost:3001/api", // /auth/login[,register]
  headers: {
    "Content-Type": "application/json",
  },
});

function getRefreshToken() {
  return instance.post("/auth/refreshtoken", {
    refreshToken: getLocalRefreshToken(),
  });
}

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      // config.headers.Authorization = "Bearer " + token; // for Spring Boot back-end
      config.headers["x-access-token"] = token; // for Node.js Express back-end
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
    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await getRefreshToken();
          const { accessToken } = rs.data;
          updateLocalAccessToken(accessToken);
          return await instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;

export const registerUser = async () => {
  try {
    const res = await instance.post("/auth/register", {
      username: "koder",
      password: "12345678",
      email: "qwert@gmail.com",
    });
    const { accessToken, refreshToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } catch (err) {
    console.log(err);
  }
};
