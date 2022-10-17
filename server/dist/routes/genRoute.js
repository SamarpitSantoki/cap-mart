"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/admin/categoryController");
const subCategoryController_1 = require("../controllers/admin/subCategoryController");
const genController_1 = require("../controllers/genController");
const router = (0, express_1.Router)();
router.get("/product", (req, res) => {
    (0, genController_1.getProducts)(req, res);
});
router.get("/product/:id", (req, res) => {
    (0, genController_1.getProduct)(req, res);
});
router.get("/category", (req, res) => {
    (0, categoryController_1.getCategory)(req, res);
});
router.get("/subcategory", (req, res) => {
    (0, subCategoryController_1.getSubCategory)(req, res);
});
exports.default = router;
