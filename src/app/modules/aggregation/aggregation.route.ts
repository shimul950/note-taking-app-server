
import { Router } from "express";
import { aggregationControllers } from "./aggregation.controller";
import { requireAdmin, requireAuth } from "../../../middleware/auth";


const router = Router();

router.get("/users/by-interests", requireAuth, requireAdmin, aggregationControllers.groupUsersByInterests);
router.get("/user/posts/:userId", requireAuth, aggregationControllers.getUserPosts);

export const aggregationRoutes = router;