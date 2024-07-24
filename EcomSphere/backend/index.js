const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const otpRoutes = require("./routes/otp");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.json()); // application/json

app.use("/images", express.static(path.join(__dirname, "images")));

const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://ecom-sphere.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res, next) => {
  res.send("Welcome to EcomSphere API.");
});

app.use("/otp", otpRoutes);
app.use("/auth", authRoutes);
app.use("/shop", shopRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  // 500 Server Side Error!
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(8080);
    console.log("Database Connnected Successfully📡");
  })
  .catch((err) => {
    console.log(err);
  });
