import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 4, maxlength: 20, required: true },
    description: { type: String, maxlength: 200 },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;
