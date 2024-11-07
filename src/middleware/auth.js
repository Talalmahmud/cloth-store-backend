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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const authMiddleware = (requiredRole) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({ message: "Access denied. No token provided." });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = yield userModel_1.default.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        if (user.role !== requiredRole) {
            return res
                .status(403)
                .json({ message: "Forbidden. Insufficient permissions." });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
});
exports.authMiddleware = authMiddleware;
