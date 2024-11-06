import mongoose from "mongoose";

interface ProductDocument extends mongoose.Document {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId;
  price: number;
  discount: number;
  stock: number;
  sellQuantity: number;
  images: string[];
  tags: string;
}

const ProductSchema = new mongoose.Schema<ProductDocument>(
  {
    name: { type: String, min: 4, max: 20, required: true },
    description: { type: String, max: 200 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    sellQuantity: { type: Number, default: 0 },
    images: [String],
    tags: { type: String, min: 4, max: 50 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
