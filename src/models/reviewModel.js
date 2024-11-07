"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReviwSchema = new mongoose_1.default.Schema({
    name: { type: String, max: 30 },
    comments: { type: String, max: 200 },
}, { timestamps: true });
const Review = mongoose_1.default.model("Review", ReviwSchema);
exports.default = Review;
