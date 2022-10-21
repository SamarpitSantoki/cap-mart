import { Request, Response, Router } from "express";
import CategoryRoutes from "./categoryRoutes";
import SubCategoryRoutes from "./subCategoryRoutes";
import ProductRoutes from "./productRoutes";
import UserRoutes from "./userRoutes";
import validateToken from "../../middlewares/validateToken";
const router = Router();

router.use(validateToken);

// check user role in access token
router.use((req: any, res: any, next: any) => {
  console.log(req.headers);

  if (req.headers.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
});

router.use("/category", CategoryRoutes);
router.use("/subcategory", SubCategoryRoutes);
router.use("/product", ProductRoutes);
router.use("/users", UserRoutes);
export default router;
