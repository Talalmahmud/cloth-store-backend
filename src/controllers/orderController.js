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
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrder = exports.createOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        let order = yield orderModel_1.default.findOne({ name: name });
        if (order) {
            return res.status(201).json({ message: "Already exist" });
        }
        order = yield orderModel_1.default.create(req.body);
        return res.status(200).json(order);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.createOrder = createOrder;
const getAllOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageNo, pageSize } = req.query;
        const page = pageNo ? parseInt(pageNo, 10) : 0;
        const size = pageSize ? parseInt(pageSize, 10) : 10;
        const validatedPage = isNaN(page) ? 0 : page;
        const validatedSize = isNaN(size) ? 10 : size;
        const order = yield orderModel_1.default.find({})
            .skip(validatedPage * validatedSize)
            .limit(validatedSize);
        return res.status(200).json(order);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.getAllOrder = getAllOrder;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield orderModel_1.default.findById(id);
        return res.status(200).json(order);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.getOrderById = getOrderById;
const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield orderModel_1.default.findByIdAndUpdate({ _id: id }, req.body);
        return res.status(200).json(order);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield orderModel_1.default.findByIdAndDelete({ _id: id });
        return res.status(200).json(order);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.deleteOrder = deleteOrder;
