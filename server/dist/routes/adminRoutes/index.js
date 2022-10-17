"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const subCategoryRoutes_1 = __importDefault(require("./subCategoryRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const validateToken_1 = __importDefault(require("../../middlewares/validateToken"));
const router = (0, express_1.Router)();
router.use(validateToken_1.default);
router.use("/category", categoryRoutes_1.default);
router.use("/subcategory", subCategoryRoutes_1.default);
router.use("/product", productRoutes_1.default);
router.use("/users", userRoutes_1.default);
exports.default = router;
