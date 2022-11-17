import axios from "axios";
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

const getUserData = async (token) => {
  return await axios
    .post(URL + "/user", {
      accessToken: token,
    })
    .then((res) => {
      return res.data;
    });
};


const apiService = {
  helloWorld,
  getUserData
};

export default apiService;
