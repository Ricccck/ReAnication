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

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const tokenService = {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateAccessToken,
  getUser,
  setUser,
  removeUser
};

export default tokenService;
