const express = require("express");
const router = express.Router();

const authToken = require("../middleware/authToken");
const { getUserDataByEmail } = require("../middleware/model");

router.post("/user", authToken, async (req, res) => {
  await getUserDataByEmail(req.userEmail).then((data) => {
    data = data[0]
    res.send(data);
  });
});

module.exports = router;
