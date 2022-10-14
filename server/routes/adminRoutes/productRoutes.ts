import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../controllers/admin/productController";
import { validateProduct } from "../../middlewares/adminMiddleware";
import fs from "fs";
import multer from "multer";
const upload = multer({ dest: "../client/public/images/" });
const router = Router();

router.post("/", upload.array("image1", 2), (req: Request, res: Response) => {
  console.log("cameherer");
  // save the file to the server
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

router.delete("/:id", (req: Request, res: Response) => {
  deleteProduct(req, res);
});

export default router;
