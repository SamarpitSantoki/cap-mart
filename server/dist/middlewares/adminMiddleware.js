"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateProduct = exports.validateProduct = exports.validateUpdateSubCategory = exports.validateSubCategory = exports.validateUpdateCategory = exports.validateCategory = void 0;
const express_validator_1 = require("express-validator");
exports.validateCategory = [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
];
exports.validateUpdateCategory = [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("id", "Id is required").not().isEmpty(),
];
exports.validateSubCategory = [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("parent", "Parent is required").not().isEmpty(),
];
exports.validateUpdateSubCategory = [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("parent", "Parent is required").not().isEmpty(),
    (0, express_validator_1.check)("id", "Id is required").not().isEmpty(),
];
exports.validateProduct = [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    (0, express_validator_1.check)("price", "Price is required").not().isEmpty(),
    (0, express_validator_1.check)("displayPrice", "Display Price is required").not().isEmpty(),
    (0, express_validator_1.check)("discountedPrice", "Discounted Price is required").not().isEmpty(),
    (0, express_validator_1.check)("category", "Category is required").not().isEmpty(),
    (0, express_validator_1.check)("subCategory", "Sub Category is required").not().isEmpty(),
];
exports.validateUpdateProduct = [
    (0, express_validator_1.check)("id", "Id is required").not().isEmpty(),
];
