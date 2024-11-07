"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/train-service";
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Attempting to connect to MongoDB...");
        yield mongoose_1.default.connect(mongoURI);
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process with failure
    }
});
exports.dbConnect = dbConnect;
mongoose_1.default.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from DB");
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    console.log("Mongoose disconnected on app termination");
    process.exit(0);
}));
