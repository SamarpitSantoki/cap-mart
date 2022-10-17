"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post("/register", authMiddleware_1.validateRegister, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    (0, authController_1.register)(req, res);
});
router.post("/login", authMiddleware_1.validateLogin, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    (0, authController_1.login)(req, res);
});
router.post("/logout", (req, res) => {
    (0, authController_1.logout)(req, res);
});
exports.default = router;
