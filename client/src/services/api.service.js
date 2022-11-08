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

const apiService = {
  helloWorld,
};

export default apiService;
