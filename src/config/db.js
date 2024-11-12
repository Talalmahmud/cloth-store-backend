import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

export const dbConnect = async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch (err) {
    console.log(err);
    process.exit(1); // Exit process with failure
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose disconnected on app termination");
  process.exit(0);
});
