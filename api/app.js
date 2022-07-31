// const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// routes
const authRouter = require("./routes/authRouter");
const contentRouter = require("./routes/contentRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth/", authRouter);
app.use("/admin/", adminRouter);
app.use("/content/", contentRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// // connect to db
// const MONGOOSE_URI =
//   "mongodb+srv://" +
//   process.env.DB_USER +
//   ":" +
//   process.env.DB_PASSWORD +
//   "@cluster0.qh6jrum.mongodb.net/?retryWrites=true&w=majority";

const MONGOOSE_URI = 

mongoose
  .connect(MONGOOSE_URI, { useNewUrlParser: true })
  .then((result) => {
    console.log("db connected");
    //app.listen(8080);
  })
  .catch((err) => console.log(err));

// Needed for nuxt.js
module.exports = {
  path: "/api",
  handler: app,
};

// module.exports = app;
