import { Router } from "express";
import { getItems } from "../controllers/itemController";
import { updateUserBalance } from "../controllers/userController";

const router = Router();

router.get("/items", getItems);
router.post("/users/balance", updateUserBalance);

export default router;
