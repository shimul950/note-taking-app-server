
import { Router } from "express";
import { noteControllers } from "./note.controller";
import { requireAuth } from "../../../middleware/auth";


const router = Router();

router.use(requireAuth);

router.post("/", noteControllers.createNote);
router.get("/", noteControllers.listMyNotes);
router.get ("/:id", noteControllers.getNoteById);
router.patch("/update/:id", noteControllers.updateNote);
router.delete("/:id", noteControllers.deleteNote);

export const noteRoutes = router;