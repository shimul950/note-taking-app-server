"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.requireAuth, post_controller_1.postControllers.createPost);
exports.postRoutes = router;
