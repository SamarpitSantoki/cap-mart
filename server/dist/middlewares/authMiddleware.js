"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
exports.validateRegister = [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Please enter a password with 8 or more characters").isLength({ min: 6 }),
];
exports.validateLogin = [
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").exists(),
];
