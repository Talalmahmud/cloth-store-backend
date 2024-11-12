import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    address: { type: String, minlength: 4, maxlength: 50, required: true },
    status: { type: String },
    phone: { type: String, maxlength: 12, required: true },
    quantity: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
