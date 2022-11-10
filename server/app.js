require("dotenv").config({ path: "../.env.local" });
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const server = require("http").createServer(app);
const { saveMessage, getAllMessage } = require("./middleware/model");
const { leaveThread } = require("./middleware/utils");

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

    socket.join(thread);

    getAllMessage(thread)
      .then((res) => {
        socket.emit("get_all_message", res);
      })
      .catch((err) => {
        console.error(err);
      });


    //apart someone arrive to thread
    let __createdtime__ = Date.now();

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

  socket.on("send_message", async (data) => {
    const { thread } = data;

    io.in(thread).emit("receive_message", data);
    await saveMessage(data);
  });

  //notice when user leave
  socket.on("leave_thread", (data) => {
    const { username, thread } = data;

    socket.leave(thread);
    const __createdtime__ = Date.now();

    allUsers = leaveThread(socket.id, allUsers);

    socket.to(thread).emit("thread_users", allUsers);
    socket.to(thread).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    });

    console.log(`${username} has left the chat`);
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
