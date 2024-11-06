import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnect } from "./utils/db";

const app = express();

async function startServer() {
  await dbConnect();
}
startServer();

app.listen(3000, () => console.log("server is running"));
