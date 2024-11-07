import express, { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";
import { authMiddleware } from "../middleware/auth";

const router: Router = Router();

router.post("/category", authMiddleware("admin"), createCategory);
router.get("/category", getAllCategory);
router.get("/category/:id", getCategoryById);
router.patch("/category/:id", authMiddleware("admin"), updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;
