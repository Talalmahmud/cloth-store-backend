"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LogSchema = new mongoose_1.default.Schema({
    logType: { type: String, min: 4, max: 20, required: true },
    itmes: { type: String },
    user: { type: mongoose_1.default.Schema.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});
const SiteLog = mongoose_1.default.model("SiteLog", LogSchema);
exports.default = SiteLog;
