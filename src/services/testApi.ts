import axios from "axios";
//import "./axios/global";

// export const axios = require("axios").default;

// custom instance for the different URL
const instance = axios.create({
  baseURL: "https://api.example.com",
});

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.params.ID = "123";
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
function getUserAccount() {
  return instance({
    method: "get",
    url: "/user/12345",
    params: {
      lang: "en",
      ID: "123",
    },
    headers: {
      Autorization: "sdf-sdf-sdf",
    },
    data: {
      firstName: "Fred",
      lastName: "Flintstone",
    },
  });
}
console.log(getUserAccount());

// async function getUserAccount() {
//   try {
//     const response = await instance.get("/user?ID=12345");
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// axios({
//   method: "get",
//   url: "/user/12345",
//   params: {
//     lang: "en",
//     ID: "123",
//   },
//   headers: {
//     Autorization: "sdf-sdf-sdf",
//   },
//   data: {
//     firstName: "Fred",
//     lastName: "Flintstone",
//   },
// })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
