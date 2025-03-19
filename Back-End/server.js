const app = require("./app");

// creating a server to run node.js
// Giving a loop back IP address( IP addresses that doesn't go outside of the local host)
const port = 3001;
const host = "127.0.0.1";
const server = app.listen(port, host, () => {
  console.log(`Node server is running at ${server.address().port}`);
});

// run nodemon server.js to run the created server
