const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if(user){
  return user.accessToken;
  }
};

const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if(user){
    return user.refreshToken;
    }
};

const updateAccessToken = (token) => {
  const user = JSON.parse(localStorage.getItem("user"));

  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getUserData = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const setUserData = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const removeUserData = () => {
  localStorage.removeItem("userData");
};

const tokenService = {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateAccessToken,
  getUser,
  setUser,
  removeUser,
  getUserData,
  setUserData,
  removeUserData
};

export default tokenService;
