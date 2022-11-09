const express = require("express");
const router = express.Router();

const userArr = [
  {
    id: 1,
    username: "Micky",
    email: "micheal.e@gmail.com",
    firstName: "Micheal",
    lastName: "Ende",
  },
  {
    id: 2,
    username: "Conan",
    email: "Rampo.e@gmail.com",
    firstName: "Rampo",
    lastName: "Edogawa",
  },
  {
    id: 3,
    username: "Naruto",
    email: "naruto.u@gmail.com",
    firstName: "Naruto",
    lastName: "Uzumaki",
  },
];

router.get("/", (req, res) => {
  res.send("This is from user.js");
});

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = userArr.find((user) => {
    return user.id === Number(userId);
  });

  res.send(user);
});

module.exports = router;
