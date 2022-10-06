import { Router } from "express";
import CategoryRoutes from "./categoryRoutes";
import SubCategoryRoutes from "./subCategoryRoutes";
import ProductRoutes from "./productRoutes";
import validateToken from "../../middlewares/validateToken";
const router = Router();

router.use(validateToken);

router.use("/category", CategoryRoutes);
router.use("/subcategory", SubCategoryRoutes);
router.use("/product", ProductRoutes);
export default router;
