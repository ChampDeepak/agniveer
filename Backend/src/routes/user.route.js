import express from "express";
import { getProfile, updateProfile } from "../controller/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", protectedRoute, getProfile);
router.put("/update", protectedRoute, updateProfile);

export default router;
