import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface CategoryDocument extends mongoose.Document {
  name: string;
  description: string;
}

const CategorySchema = new mongoose.Schema<CategoryDocument>(
  {
    name: { type: String, min: 4, max: 20, required: true },
    description: { type: String, max: 200 },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<CategoryDocument>("Category", CategorySchema);

export default Category;
