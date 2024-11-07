"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post("/user", userController_1.createUser);
router.post("/login", userController_1.loginUser);
router.get("/logout", userController_1.loginUser);
exports.default = router;
