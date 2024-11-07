"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, min: 4, max: 20, required: true },
    description: { type: String, max: 200 },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
    tags: { type: String, min: 4, max: 50 },
    notes: { type: String, min: 4, max: 50 },
}, {
    timestamps: true,
});
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.default = Product;
