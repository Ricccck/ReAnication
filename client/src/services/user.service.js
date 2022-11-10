import axios from "axios";
const URL = "/user";

const getUserData = async (userId) => {
  return await axios
    .get(URL + `/${userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const userService = {
  getUserData,
};

export default userService;
