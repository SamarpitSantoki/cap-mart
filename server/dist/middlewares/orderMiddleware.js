"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = void 0;
const express_validator_1 = require("express-validator");
exports.validateOrder = [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail(),
    (0, express_validator_1.check)("phone", "Phone is required").not().isEmpty(),
    (0, express_validator_1.check)("address", "Address is required").not().isEmpty(),
    (0, express_validator_1.check)("cartItems", "Cart Items is required").not().isEmpty(),
];
