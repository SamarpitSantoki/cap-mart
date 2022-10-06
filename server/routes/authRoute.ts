import { Router } from "express";
import { validateLogin, validateRegister } from "../middlewares/authMiddleware";
import { validationResult } from "express-validator";
import { login, logout, register } from "../controllers/authController";

const router = Router();

router.post("/register", validateRegister, (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  register(req, res);
});

router.post("/login", validateLogin, (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  login(req, res);
});
router.post("/logout", (req: any, res: any) => {
  logout(req, res);
});

export default router;
