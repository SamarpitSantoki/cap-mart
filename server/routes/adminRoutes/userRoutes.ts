import { Router } from "express";
import { GetUserList } from "../../controllers/admin/userController";

const router = Router();

router.get("/", GetUserList);

export default router;
