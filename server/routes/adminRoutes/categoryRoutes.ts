import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../controllers/admin/categoryController";
import {
  validateCategory,
  validateUpdateCategory,
} from "../../middlewares/adminMiddleware";

const router = Router();

router.post("/", validateCategory, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  createCategory(req, res);
});

router.get("/", (req: Request, res: Response) => {
  getCategory(req, res);
});

router.patch("/", validateUpdateCategory, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  updateCategory(req, res);
});

export default router;
