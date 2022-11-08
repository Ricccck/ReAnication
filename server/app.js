const path = require('path');
const express = require("express")
const app = express();

app.use(express.json());

app.use("/api", require("./routes/api"))
// app.use("/user", require("./routes/user"))
// app.use("/auth", require("./routes/auth"))

app.use(express.static(path.join(__dirname, '../client/build')));

const PORT = 8080;
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})

module.exports = app;