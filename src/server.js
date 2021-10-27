// imports
const express = require("express");
const { json } = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// routes
const { userRouter, gifRouter } = require("./routes");

// app creation
const app = express();

// app usage of imports
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors());

// app used routes
app.use("/users", userRouter);
app.use("/gifs", gifRouter);

// test request to see server works properly
app.get("/", (req, res) => {
  res.status(200).send({
    message: "This is an API for GIFHome Project",
  });
});

module.exports = app;
