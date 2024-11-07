"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    name: { type: String, min: 4, max: 20, required: true },
    description: { type: String, max: 200 },
}, {
    timestamps: true,
});
const Category = mongoose_1.default.model("Category", CategorySchema);
exports.default = Category;
