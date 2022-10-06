import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orderController";
import { validateOrder } from "../middlewares/orderMiddleware";
import validateToken from "../middlewares/validateToken";
const router = Router();

router.use(validateToken);

router.post("/", validateOrder, (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  createOrder(req, res);
});

router.get("/", (req: Request, res: Response) => {
  getOrders(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  getOrder(req, res);
});

router.patch("/:id", (req: Request, res: Response) => {
  updateOrder(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  deleteOrder(req, res);
});

export default router;
