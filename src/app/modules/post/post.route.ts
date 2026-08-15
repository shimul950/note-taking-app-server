
import { Router } from "express";
import { postControllers } from "./post.controller";
import { requireAuth } from "../../../middleware/auth";


const router = Router();

router.post("/", requireAuth, postControllers.createPost);

export const postRoutes = router;