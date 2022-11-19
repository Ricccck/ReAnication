import axios from "axios";
import tokenService from "./token.service";

const URL = "/auth";

const signup = async (
  username,
  firstname,
  lastname,
  gender,
  email,
  password
) => {
  console.log(username, firstname, lastname, gender, email, password);

  return await axios
    .post(URL + "/signup", {
      userName: username,
      firstName: firstname,
      lastName: lastname,
      gender: gender,
      userEmail: email,
      userPassword: password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        tokenService.setUser(res.data)
      }

      return res.data;
    });
};

const login = async (email, password) => {
  return await axios
    .post(URL + "/login", {
      userEmail: email,
      userPassword: password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        tokenService.setUser(res.data)
      }

      return res.data;
    });
};

const logout = async () => {
  tokenService.removeUser();

  
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
