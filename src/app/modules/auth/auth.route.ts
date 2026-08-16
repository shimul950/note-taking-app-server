
import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.get("/me", authControllers.getMe)
router.post("/logout", authControllers.logout);

export const authRoutes = router;