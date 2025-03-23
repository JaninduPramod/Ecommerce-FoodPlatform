import express, { json, urlencoded } from "express";
import customerRoute from "./src/Routes/customerRoute.mjs";
import userRoute from "./src/Routes/userRoute.mjs";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(customerRoute, userRoute);

const server = app.listen(3000, () => {
  console.log(server.address().port);
});

export default app;
