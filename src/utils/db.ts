import mongoose from "mongoose";

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/train-service";

export const dbConnect = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (err: any) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err: any) => {
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
