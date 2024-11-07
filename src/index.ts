import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { dbConnect } from "./utils/db";
import userRoute from "./routes/userRoute";

import productRoute from "./routes/productRoute";
import categoryRoute from "./routes/categoryRoute";
import orderRoute from "./routes/orderRoute";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
async function startServer() {
  await dbConnect();
}
startServer();

app.use("/api/v1", userRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);

app.listen(3000, () => console.log("server is running"));
