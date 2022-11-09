const express = require("express");
const router = express.Router();


const threadArr = [
  {id: 1,
  name: "Iruma-kun OMOROI",
  createdBy: "Micky",
  body: ""}
]

router.get("/", (req, res) => {
  res.send("This is from api.js");
});

router.get("/thread/all", (req, res) => {
  res.send(threadArr);
});

router.get("/thread/:threadId", () => {
  const threadId = req.params.threadId;
  const thread = userArr.find((user) => {
    return thread.id === Number(threadId);
  });
  res.send(thread)
})

router.post("/thread/post", (req, res) => {
});

module.exports = router;
