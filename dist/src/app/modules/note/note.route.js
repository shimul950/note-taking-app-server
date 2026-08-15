"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRoutes = void 0;
// note.route.ts
const express_1 = require("express");
const note_controller_1 = require("./note.controller");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
router.post("/", note_controller_1.noteControllers.createNote);
router.get("/", note_controller_1.noteControllers.listMyNotes);
router.patch("/:id", note_controller_1.noteControllers.updateNote);
router.delete("/:id", note_controller_1.noteControllers.deleteNote);
exports.noteRoutes = router;
