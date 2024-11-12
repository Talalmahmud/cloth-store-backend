import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 4, maxlength: 20 },
    email: { type: String, maxlength: 20 },
    password: { type: String, minlength: 8, maxlength: 20, required: true },
    role: { type: String, enum: ["admin", "user", "stuff"], default: "user" },
    address: { type: String, maxlength: 30 },
    phone: { type: String, maxlength: 14, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
