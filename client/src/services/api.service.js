import axios from "axios";
import api from "./api.axios"
const URL = "/api";

const helloWorld = async () => {
  return await axios
    .get(URL)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserData = async () => {
  return await api
    .get(URL + "/user")
    .then((res) => {
      return res.data;
    });
};

const apiService = {
  helloWorld,
  getUserData,
};

export default apiService;
