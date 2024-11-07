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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProduct = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const product = yield productModel_1.default.findOne({ name: name });
        if (product) {
            return res.status(201).json({ message: "Already exist" });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.createProduct = createProduct;
const getAllProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageNo, pageSize } = req.query;
        const page = pageNo ? parseInt(pageNo, 10) : 0;
        const size = pageSize ? parseInt(pageSize, 10) : 10;
        const validatedPage = isNaN(page) ? 0 : page;
        const validatedSize = isNaN(size) ? 10 : size;
        const product = yield productModel_1.default.find({})
            .skip(validatedPage * validatedSize)
            .limit(validatedSize);
        return res.status(200).json(product);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.getAllProduct = getAllProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productModel_1.default.findById(id);
        return res.status(200).json(product);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productModel_1.default.findByIdAndUpdate({ _id: id }, req.body);
        return res.status(200).json(product);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productModel_1.default.findByIdAndDelete({ _id: id });
        return res.status(200).json(product);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.deleteProduct = deleteProduct;
