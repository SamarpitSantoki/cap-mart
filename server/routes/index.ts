import { Router } from "express";
import dbConnect from "../db/connect";
import AuthRoute from "./authRoute";
import AdminRoute from "./adminRoutes/";
import OrderRoute from "./orderRoute";
import GenRoute from "./genRoute";
const router = Router();

router.use("/auth", AuthRoute);
router.use("/admin", AdminRoute);
router.use("/order", OrderRoute);
router.use("/", GenRoute);
export default router;
