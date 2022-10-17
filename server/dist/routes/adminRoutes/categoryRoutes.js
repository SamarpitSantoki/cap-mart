"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categoryController_1 = require("../../controllers/admin/categoryController");
const adminMiddleware_1 = require("../../middlewares/adminMiddleware");
const router = (0, express_1.Router)();
router.post("/", adminMiddleware_1.validateCategory, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    (0, categoryController_1.createCategory)(req, res);
});
router.get("/", (req, res) => {
    (0, categoryController_1.getCategory)(req, res);
});
router.patch("/", adminMiddleware_1.validateUpdateCategory, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    (0, categoryController_1.updateCategory)(req, res);
});
router.delete("/:id", (req, res) => {
    (0, categoryController_1.deleteCategory)(req, res);
});
exports.default = router;
