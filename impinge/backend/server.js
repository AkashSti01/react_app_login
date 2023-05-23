require("dotenv").config();
const express = require("express");
const dbConnect = require("./db/db");
//const { errorHandler } = require("./middleware/errormiddleware");
const userApis = require("./router/userroutes");
const bodyparse = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8000;
const app = express();

//middleware created for bodyparse
app.use(bodyparse.json({ extended: true }));
app.use(bodyparse.urlencoded({ extended: true }));
// Database is connected.
dbConnect();
app.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true,
  })
);

// Routes for displaying home page.
app.get("/", (req, res) => {
  res.send("<h3>Wecome to node server</h3>");
});

app.use("/", userApis);

app.listen(port, (req, res) => {
  console.log(
    `Server Running ${process.env.NODE_ENV} Mode on port ${process.env.PORT}.`
  );
});
