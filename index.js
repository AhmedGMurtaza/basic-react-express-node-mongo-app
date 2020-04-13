const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes/api");
require("dotenv").config();

const app = express();

// DB connection started ***
//Set up default mongoose connection
var mongoDB = "mongodb://127.0.0.1/test";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

// serving react app on same port as express api
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/json", function (req, res) {
  const response = "Hello World";
  res.json({
    message: response,
  });
});

// API routes
app.use("/api", routes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port 5000`);
});
