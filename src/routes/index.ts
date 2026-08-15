import { Router } from "express";
import { authRoutes } from "../app/modules/auth/auth.route";
import { adminRoutes } from "../app/modules/admin/admin.route";
import { noteRoutes } from "../app/modules/note/note.route";

const router = Router()

router.use("/auth", authRoutes)

router.use("/admin", adminRoutes)

router.use("/note", noteRoutes)


export const indexRoutes = router