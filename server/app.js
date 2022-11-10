require("dotenv").config({ path: "../.env.local" });
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];

//socket.io connection
io.on("connection", (socket) => {
  //notice when user join
  console.log(`a user connected ${socket.id}`);

  //add user to a thread
  socket.on("join-thread", (data) => {
    const { username, thread } = data;

    let __createdtime__ = Date.now();

    //apart someone arrive to thread
    socket.to(thread).emit("receive_message", {
      message: `${username} has joined the thread`,
      username: CHAT_BOT,
      __createdtime__,
    });
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    chatRoom = thread;
    allUsers.push({ id: socket.id, username, thread });
    threadUsers = allUsers.filter((user) => user.thread === thread);

    socket.to(thread).emit("thread_users", threadUsers);
    socket.emit("thread_users", threadUsers);
  });

  //notice when user leave
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//express server connections
app.use(express.json());

app.use("/api", require("./routes/api"));
app.use("/user", require("./routes/user"));
// app.use("/auth", require("./routes/auth"))

app.use(express.static(path.join(__dirname, "../client/build")));

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
