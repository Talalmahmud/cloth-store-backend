import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnect } from "./config/db.js";
import userRoute from "./routes/userRoute.js";

import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT;

await dbConnect();

app.use("/api/v1", userRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);

app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});
app.use((req, res, err) => {
  return res.status(500).json({ message: "Internal Server Error", err });
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
