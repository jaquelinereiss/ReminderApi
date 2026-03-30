import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { registerDevice } from "../../modules/devices/devices.controller.js";

const router = Router();

router.use(authMiddleware);
router.post("/", registerDevice);

export default router;