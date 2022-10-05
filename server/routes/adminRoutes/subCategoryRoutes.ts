import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../../controllers/admin/subCategoryController";
import {
  validateSubCategory,
  validateUpdateSubCategory,
} from "../../middlewares/adminMiddleware";

const router = Router();

router.post("/", validateSubCategory, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  createSubCategory(req, res);
});

router.get("/", (req: Request, res: Response) => {
  getSubCategory(req, res);
});

router.patch("/", validateUpdateSubCategory, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  updateSubCategory(req, res);
});

export default router;
