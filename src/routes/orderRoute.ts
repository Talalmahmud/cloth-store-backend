import express, { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
} from "../controllers/orderController";

const router: Router = Router();

router.post("/order", createOrder);
router.get("/order", getAllOrder);
router.patch("/order/:id", updateOrder);
router.get("/order/:id", getOrderById);

router.delete("/order", deleteOrder);

export default router;
