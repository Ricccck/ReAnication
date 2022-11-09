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



const getAllThread = async () => {
  return await axios
    .get(URL + "/thread/all")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getThread = async (threadId) => {
  return await axios
    .get(URL + `/thread/${threadId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const apiService = {
  helloWorld,
  getAllThread,
  getThread,
};

export default apiService;
