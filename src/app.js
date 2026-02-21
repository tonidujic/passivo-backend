const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, (req, res) => {
  console.log("Server runing on port 3000");
});
