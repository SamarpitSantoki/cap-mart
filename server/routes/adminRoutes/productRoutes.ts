import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../controllers/admin/productController";
import { validateProduct } from "../../middlewares/adminMiddleware";

const router = Router();

router.post("/", validateProduct, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  createProduct(req, res);
});

router.get("/", (req: Request, res: Response) => {
  getProducts(req, res);
});

router.patch("/", (req: Request, res: Response) => {
  updateProduct(req, res);
});

router.delete("/", (req: Request, res: Response) => {
  deleteProduct(req, res);
});

export default router;
