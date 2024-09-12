import express from "express";
import { getDashboard, user } from "../Controllers/General.js";

const router = express.Router();

router.get("/user/:id", user);
router.get("/dashboard",getDashboard)

export default router;
