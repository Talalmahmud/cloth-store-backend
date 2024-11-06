import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user" | "stuff";
  address?: string;
  latitude?: number;
  longitude?: number;
  isModified: (path: string) => boolean;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, min: 4, max: 20 },
    email: { type: String, max: 20 },
    password: { type: String, min: 8, max: 20, required: true },
    role: { type: String, enum: ["admin", "user", "stuff"], default: "user" },
    address: { type: String, max: 30 },
    phone: { type: String, max: 14, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next: (err?: Error) => void) {
  const user = this as UserDocument;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
