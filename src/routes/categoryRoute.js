import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controller/categoryController.js";

const router = express.Router();
router.post("/category", authMiddleware("admin"), createCategory);
router.get("/category", getAllCategory);
router.get("/category/:id", getCategoryById);
router.patch("/category/:id", authMiddleware("admin"), updateCategory);
router.delete("/category/:id", deleteCategory);
export default router;
