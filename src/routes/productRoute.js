import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controller/productController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.post("/product", authMiddleware("admin"), createProduct);
router.get("/product", getAllProduct);
router.get("/product/:id", getProductById);
router.patch("/product/:id", authMiddleware("admin"), updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
