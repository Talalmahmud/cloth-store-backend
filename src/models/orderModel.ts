import mongoose from "mongoose";

interface OrderDocument extends mongoose.Document {
  product: mongoose.Types.ObjectId;
  address: string;
  status: string;
  quantity: number;
}

const OrderSchema = new mongoose.Schema<OrderDocument>(
  {
    address: { type: String, min: 4, max: 50, required: true },
    status: { type: String },
    quantity: { type: Number, required: true },
    product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<OrderDocument>("Order", OrderSchema);

export default Order;
