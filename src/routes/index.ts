import { Router } from "express";
import { authRoutes } from "../app/modules/auth/auth.route";
import { adminRoutes } from "../app/modules/admin/admin.route";
import { noteRoutes } from "../app/modules/note/note.route";
import { postRoutes } from "../app/modules/post/post.route";
import { aggregationRoutes } from "../app/modules/aggregation/aggregation.route";

const router = Router()

router.use("/auth", authRoutes)

router.use("/admin", adminRoutes)

router.use("/note", noteRoutes)

router.use("/post", postRoutes);

router.use("/aggregation", aggregationRoutes);


export const indexRoutes = router