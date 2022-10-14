import { Router } from "express";
import { getCategory } from "../controllers/admin/categoryController";
import { getSubCategory } from "../controllers/admin/subCategoryController";
import { getProduct, getProducts } from "../controllers/genController";

const router = Router();

router.get("/product", (req, res) => {
  getProducts(req, res);
});

router.get("/product/:id", (req, res) => {
  getProduct(req, res);
});

router.get("/category", (req, res) => {
  getCategory(req, res);
});

router.get("/subcategory", (req, res) => {
  getSubCategory(req, res);
});



export default router;
