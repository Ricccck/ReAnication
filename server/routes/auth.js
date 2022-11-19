require("dotenv").config({ path: "../../.env.local" });
const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refreshTokenArr = [];
let allUsers = [];

const { getAllUsers, sendUserData } = require("../middleware/model");

router.get("/", function (req, res) {
  res.send("This is from auth.js");
});

router.post("/signup", async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
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

  bcryptPassword = await bcrypt.hash(userPassword, 10);
  console.log(bcryptPassword);
  req.body.userPassword = bcryptPassword;

  await sendUserData(req.body);

  const accessToken = await JWT.sign(
    { userEmail },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );

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

  const isMatch = await bcrypt.compare(userPassword, user.userPassword);

  if (!isMatch) {
    res.status(401).send({
      error: "Email or password is invalid",
    });
  }

  const accessToken = await JWT.sign(
    { userEmail },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );

  const refreshToken = await JWT.sign(
    { userEmail },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "7 days",
    }
  );

  refreshTokenArr.push(refreshToken);

  res.status(202).send({
    accessToken,
    refreshToken,
  });
});

router.post("/token", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    res.status(401).json({
      errors: "Token not found",
    });
  }

  if (!refreshTokenArr.includes(refreshToken)) {
    res.status(403).json({
      errors: "Invalid refresh token",
    });
  }

  try {
    const user = await JWT.verify(
      refreshToken,
      process.env.RREFRESH_TOKEN_SECRET_KEY
    );

    const { email } = user;
    const accessToken = await JWT.sign(
      { email },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "15m" }
    );
    res.send({ accessToken });
  } catch (error) {
    res.status(403).json({
      errors: "Invalid token",
    });
  }
});

router.delete("/logout", (req, res) => {
  const refreshToken = req.header("auth-token");

  refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken);
  res.sendStatus(204);
});

module.exports = router;
