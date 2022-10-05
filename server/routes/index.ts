import { Router } from "express";
import dbConnect from "../db/connect";
import AuthRoute from "./authRoute";
import AdminRoute from "./adminRoutes/adminRoute";
const router = Router();

dbConnect();
router.use("/auth", AuthRoute);
router.use("/admin", AdminRoute);
export default router;
