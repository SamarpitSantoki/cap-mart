import { Router } from "express";
import CategoryRoutes from "./categoryRoutes";
import SubCategoryRoutes from "./subCategoryRoutes";
import ProductRoutes from "./productRoutes";
const router = Router();

router.use("/category", CategoryRoutes);
router.use("/subcategory", SubCategoryRoutes);
router.use("/product", ProductRoutes);
export default router;
