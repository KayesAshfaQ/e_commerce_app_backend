// IMPORTS FROM PACKAGES
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// IMPORTS FROM FILES
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");

// INIT MIDDLEWARE
app.use(express.json()); // for parsing application/json
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);

// INIT SERVER CONFIG
const PORT = 3000;
const IP = "0.0.0.0";
const DB =
  "mongodb+srv://asfak7074:Password123@cluster0.n9azne2.mongodb.net/?retryWrites=true&w=majority";

// INIT MONGODB
mongoose
  .connect(DB)
  .then(() => {
    console.log("mongodb connection established");
  })
  .catch((e) => {
    console.log(e);
  });

// INIT SERVER
app.listen(PORT, IP, function () {
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
