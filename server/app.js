require("dotenv").config({ path: "../.env.local" });

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

//create socke.io server
const server = require("http").createServer(app);
const socketio = require("./routes/socketio")
const io = require("socket.io")(server);

app.use(cors());
app.use(express.json());


//express server connections
app.use("/api", require("./routes/api"));
app.use("/user", require("./routes/user"));
// app.use("/auth", require("./routes/auth"))

app.use(express.static(path.join(__dirname, "../client/build")));

//open socket port
socketio(io)

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
