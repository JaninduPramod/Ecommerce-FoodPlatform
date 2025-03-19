const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controller");

app.use(cors()); //created a middle ware

app.use(
  express.urlencoded({
    extended: true, // allows to encode nested objects also
  })
); //express.urlencoded is used to encode and use the MIME type data that coming from HTML

app.use(express.json()); // all the request & responses are done with JSOn format

// api's

app.get("/users", (req, res) => {
  controller.GetUsers((users) => {
    res.send(users);
  });
});

app.get("/userid", (req, res) => {
  const id = req.query.id;
  controller.userById((user) => {
    res.send(user);
  }, id);
});

module.exports = app;

// this is a express application
