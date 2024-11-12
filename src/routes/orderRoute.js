import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
} from "../controller/orderController.js";

const router = express.Router();
router.post("/order", createOrder);
router.get("/order", getAllOrder);
router.patch("/order/:id", updateOrder);
router.get("/order/:id", getOrderById);

router.delete("/order", deleteOrder);

export default router;
