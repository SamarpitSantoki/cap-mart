"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const subCategoryController_1 = require("../../controllers/admin/subCategoryController");
const adminMiddleware_1 = require("../../middlewares/adminMiddleware");
const router = (0, express_1.Router)();
router.post("/", adminMiddleware_1.validateSubCategory, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    (0, subCategoryController_1.createSubCategory)(req, res);
});
router.get("/", (req, res) => {
    (0, subCategoryController_1.getSubCategory)(req, res);
});
router.patch("/", adminMiddleware_1.validateUpdateSubCategory, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    (0, subCategoryController_1.updateSubCategory)(req, res);
});
router.delete("/", (req, res) => {
    (0, subCategoryController_1.deleteSubCategory)(req, res);
});
exports.default = router;
