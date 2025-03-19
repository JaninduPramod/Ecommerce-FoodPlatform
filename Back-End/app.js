const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors()); //created a middle ware

app.use(
  express.urlencoded({
    extended: true, // allows to encode nested objects also
  })
); //express.urlencoded is used to encode and use the MIME type data that coming from HTML

app.use(express.json()); // all the request & responses are done with JSOn format

module.exports = app;

// this is a express application
