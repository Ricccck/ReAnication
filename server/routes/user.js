const express = require("express");
const router = express.Router();

const authToken = require("../middleware/authToken");
const { getUserByEmail } = require("../middleware/model");

router.get("/", (req, res) => {
  res.send("This is from user.js");
});

router.post("/user", authToken, async (req, res) => {
  await getUserByEmail(req.userEmail).then((data) => {
    res.send(data);
  });
});

module.exports = router;
