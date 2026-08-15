
import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);

export const authRoutes = router;