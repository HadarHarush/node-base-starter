require("dotenv").config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routers/user-router");

const app = express();

// Express App Config
app.use(express.json({ limit: "50mb" }));

console.log("process.env.DB_URL:", process.env.DB_URL);

mongoose.connect(process.env.DB_URL, {});

// routes
app.use("/api/auth", userRouter);

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
