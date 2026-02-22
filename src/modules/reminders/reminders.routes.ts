import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { create, list, update, toggle, remove } from "./reminders.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/", create);
router.get("/", list);
router.put("/:id", update);
router.patch("/:id/active", toggle);
router.delete("/:id", remove);

export default router;
