require("dotenv").config({ path: "../../.env.local" });
const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refreshTokens = [];
let allUsers = [];

const { getAllUsers } = require("../middleware/model");

router.get("/", function (req, res) {
  res.send("This is from auth.js");
});

router.post("/signup", async (req, res) => {
  const { userName, userEmail, userPassword} = req.body;
  await getAllUsers().then((data) => {
    return (allUsers = data);
  });

  let email = allUsers.find((user) => {
    return user.userEmail === userEmail;
  });

  if (email) {
    res.status(200).send({
      email: user.userEmail,
      message: "This email adress already exists",
    });
  }

  let username = allUsers.find((user) => {
    return user.userName === userName;
  });

  if (username) {
    res.status(200).send({
      username: user.userName,
      message: "This user name already exists",
    });
  }

  bcryptPassword = bcrypt.hashSync(userPassword, 10);
  userPassword = bcryptPassword;

  await sendUserData(req.body);

  const accessToken = await JWT.sign({ userEmail }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  res.status(201).send(accessToken);
});

router.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;

  await getAllUsers().then((data) => {
    return (allUsers = data);
  });

  let user = allUsers.find((user) => {
    return user.userEmail === userEmail;
  });

  if (!user) {
    res.status(400).send({
      error: "Invalid credentials",
    });
  }

  let isMatch = await bcrypt.compare(userPassword, user.userPassword);

  if (!isMatch) {
    res.status(401).send({
      error: "Email or password is invalid",
    });
  }

  const accessToken = await JWT.sign({ userEmail }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  const refreshToken = await JWT.sign({ userEmail }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "5m",
  });

  refreshTokens.push(refreshToken);

  res.send({
    accessToken,
    refreshToken,
  });
});

module.exports = router;
