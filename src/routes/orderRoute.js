import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
} from "../controller/orderController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.post("/order", createOrder);
router.get("/order", authMiddleware("admin"), getAllOrder);
router.patch("/order/:id", authMiddleware("admin"), updateOrder);
router.get("/order/:id", authMiddleware("admin"), getOrderById);
router.delete("/order", authMiddleware("admin"), deleteOrder);

export default router;
