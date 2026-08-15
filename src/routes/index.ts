import { Router } from "express";
import { authRoutes } from "../app/modules/auth/auth.route";
import { adminRoutes } from "../app/modules/admin/admin.route";

const router = Router()

router.use("/auth", authRoutes)

router.use("/admin", adminRoutes)


export const indexRoutes = router