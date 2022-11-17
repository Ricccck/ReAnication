import axios from "axios";

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
        localStorage.setItem("user", JSON.stringify(res.data));
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
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      return res.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userData");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
