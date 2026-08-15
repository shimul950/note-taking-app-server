
import { Router } from "express";
import { adminControllers } from "./admin.controller";
import { requireAuth, requireAdmin } from "../../../middleware/auth";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/users", adminControllers.listUsers);
router.post("/user", adminControllers.createUser);
router.patch("/user/:id", adminControllers.updateUser);
router.delete("/user/:id", adminControllers.deleteUser);

router.get("/notes", adminControllers.listAllNotes);

export const adminRoutes = router;