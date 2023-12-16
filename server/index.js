console.log("Hello, Node!");

// import express
const express = require("express");
const app = express();

// init server info
const PORT = 3000;
const IP = "0.0.0.0";

// creating a server
app.listen(PORT, function () {
  console.log(`connection established at port ${PORT}`);
});

// initial api
app.get("/", function (req, res) {
  res.send(`hello from PORT : ${PORT}`);
});

// a get api
app.get("/hello-world", function (req, res) {
  res.json({ hi: "hello world" });
});
