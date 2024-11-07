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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategory = exports.createCategory = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        let category = yield categoryModel_1.default.findOne({ name: name });
        if (category) {
            return res.status(201).json({ message: "Already exist" });
        }
        category = yield categoryModel_1.default.create(req.body);
        return res.status(200).json(category);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.createCategory = createCategory;
const getAllCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageNo, pageSize } = req.query;
        const page = pageNo ? parseInt(pageNo, 10) : 0;
        const size = pageSize ? parseInt(pageSize, 10) : 10;
        const validatedPage = isNaN(page) ? 0 : page;
        const validatedSize = isNaN(size) ? 10 : size;
        const category = yield categoryModel_1.default.find({})
            .skip(validatedPage * validatedSize)
            .limit(validatedSize);
        return res.status(200).json(category);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.getAllCategory = getAllCategory;
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categoryModel_1.default.findById(id);
        return res.status(200).json(category);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.getCategoryById = getCategoryById;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categoryModel_1.default.findByIdAndUpdate({ _id: id }, req.body);
        return res.status(200).json(category);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categoryModel_1.default.findByIdAndDelete({ _id: id });
        return res.status(200).json(category);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
});
exports.deleteCategory = deleteCategory;
