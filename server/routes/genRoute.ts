import { Router } from "express";
import { getProduct, getProducts } from "../controllers/genController";

const router = Router();

router.get("/product", (req, res) => {
  getProducts(req, res);
});

router.get("/product/:id", (req, res) => {
  getProduct(req, res);
});

export default router;
