import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface LogDocument extends mongoose.Document {
  logType: string;
  itmes: string;
  user: mongoose.Types.ObjectId;
}

const LogSchema = new mongoose.Schema<LogDocument>(
  {
    logType: { type: String, min: 4, max: 20, required: true },
    itmes: { type: String },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const SiteLog = mongoose.model<LogDocument>("SiteLog", LogSchema);

export default SiteLog;
