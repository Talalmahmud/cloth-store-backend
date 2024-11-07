import express, { Router } from "express";

import { authMiddleware } from "../middleware/auth";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controllers/productController";

const router: Router = Router();

router.post("/product", authMiddleware("admin"), createProduct);
router.get("/product", getAllProduct);
router.get("/product/:id", getProductById);
router.patch("/product/:id", authMiddleware("admin"), updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
