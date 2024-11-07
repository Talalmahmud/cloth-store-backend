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
exports.userLogout = exports.loginUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phone } = req.body;
        let user = yield userModel_1.default.findOne({ phone: phone });
        if (user) {
            return res.status(201).json({ message: "User already exist." });
        }
        user = yield userModel_1.default.create(req.body);
        return res.status(200).json({ message: "User is created", user });
    }
    catch (error) {
        const errorMessage = error.message;
        return res
            .status(500)
            .json({ message: "Internal server error", error: errorMessage });
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ phone });
        if (!user) {
            return res
                .status(400)
                .json({ message: "User number or password is incorrect" });
        }
        const isCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (isCorrect) {
            const token = jsonwebtoken_1.default.sign({ id: user._id, phone: user.phone }, process.env.SECRET_KEY, // Store the secret key in an environment variable
            { expiresIn: "20h" });
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 3600000 * 20,
            });
            return res.status(200).json({ message: "User is logged.", token: token });
        }
        return res
            .status(400)
            .json({ message: "User number or password is incorrect" });
    }
    catch (error) {
        const errorMessage = error.message;
        return res
            .status(500)
            .json({ message: "Internal server error", error: errorMessage });
    }
});
exports.loginUser = loginUser;
const userLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.cookies("access_token", "");
    return res.status(200).json({ message: "User is logged out." });
});
exports.userLogout = userLogout;
