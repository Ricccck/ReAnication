const express = require("express");
const router = express.Router();

const {getAllMessage} = require("../middleware/model");

router.get("/thread/all", (req, res) => {
  res.send(threadArr);
});

module.exports = router;
