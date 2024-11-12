import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 4, maxlength: 20, required: true },
    description: { type: String, maxlength: 200 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, default: 0 },
    insideDhaka: { type: Number, default: 0 },
    outsideDhaka: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    sellQuantity: { type: Number, default: 0 },
    images: [String],
    tags: { type: String, minlength: 4, maxlength: 50 },
    notes: { type: String, minlength: 4, maxlength: 50 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
