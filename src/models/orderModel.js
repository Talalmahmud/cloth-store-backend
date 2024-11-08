"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    address: { type: String, min: 4, max: 50, required: true },
    status: { type: String },
    quantity: { type: Number, required: true },
    product: { type: mongoose_1.default.Schema.ObjectId, ref: "Product", required: true },
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
