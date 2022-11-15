const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];

const { saveMessage, getAllMessage } = require("../middleware/model");
const { leaveThread } = require("../middleware/utils");

const socketio = (io) => {
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
  
    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected from the chat`);
      const user = allUsers.find((user) => user.id == socket.id);
      const __createdtime__ = Date.now();
  
      if (user?.username) {
        allUsers = leaveThread(socket.id, allUsers);
        socket.to(chatRoom).emit("thread_users", allUsers);
        socket.to(chatRoom).emit("receive_message", {
          username: CHAT_BOT,
          message: `${user.username} has disconnected from the chat.`,
          __createdtime__,
        });
      }
    });
  });  
}

module.exports = socketio;