"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const orderController_1 = require("../controllers/orderController");
const orderMiddleware_1 = require("../middlewares/orderMiddleware");
const validateToken_1 = __importDefault(require("../middlewares/validateToken"));
const router = (0, express_1.Router)();
router.use(validateToken_1.default);
router.post("/", orderMiddleware_1.validateOrder, (req, res) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    (0, orderController_1.createOrder)(req, res);
});
router.get("/", (req, res) => {
    (0, orderController_1.getOrders)(req, res);
});
router.get("/:id", (req, res) => {
    (0, orderController_1.getOrder)(req, res);
});
router.patch("/:id", (req, res) => {
    (0, orderController_1.updateOrder)(req, res);
});
router.delete("/:id", (req, res) => {
    (0, orderController_1.deleteOrder)(req, res);
});
exports.default = router;
