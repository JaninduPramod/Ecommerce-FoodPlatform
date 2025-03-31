import express, { json, response, urlencoded } from "express";
import customerRoute from "./src/Routes/customerRoute.mjs";
import userRoute from "./src/Routes/userRoute.mjs";
import supplierRoute from "./src/Routes/supplierRoute.mjs";
import CategoriesRoute from "./src/Routes/categoryRoute.mjs";
import cors from "cors";
import productRoute from "./src/Routes/productRoute.mjs";
import feedBackRoute from "./src/Routes/feedbackRoute.mjs";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(
  customerRoute,
  userRoute,
  productRoute,
  supplierRoute,
  CategoriesRoute,
  feedBackRoute
);

const uri =
  "mongodb+srv://JaninduPramod:702150@urbanfoodecommerce.jebi4.mongodb.net/?retryWrites=true&w=majority&appName=UrbanFoodEcommerce";

const connectMongoose = () => {
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error: ", error));
};

// connectMongoose();

const server = app.listen(3000, () => {
  console.log(server.address().port);
});

export default app;
