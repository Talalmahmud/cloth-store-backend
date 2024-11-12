import express from "express";
import { createUser, loginUser } from "../controller/userController.js";

const router = express.Router();

router.post("/user", createUser);
router.post("/login", loginUser);
router.get("/logout", loginUser);

export default router;
