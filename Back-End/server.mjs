import express, { json, urlencoded } from "express";
import customerRoute from "./src/Routes/customerRoute.mjs";
import userRoute from "./src/Routes/userRoute.mjs";
// import supplierRoute from "./src/Routes/supplierRoute.mjs";
import cors from "cors";
import productRoute from "./src/Routes/productRoute.mjs";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use(customerRoute, userRoute, productRoute);

const server = app.listen(3000, () => {
  console.log(server.address().port);
});

export default app;
