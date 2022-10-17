"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productController_1 = require("../../controllers/admin/productController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "/client/public/images/" });
const router = (0, express_1.Router)();
router.post("/", upload.array("image1", 2), (req, res) => {
    console.log("cameherer");
    // save the file to the server
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    (0, productController_1.createProduct)(req, res);
});
router.get("/", (req, res) => {
    (0, productController_1.getProducts)(req, res);
});
router.patch("/", (req, res) => {
    (0, productController_1.updateProduct)(req, res);
});
router.delete("/:id", (req, res) => {
    (0, productController_1.deleteProduct)(req, res);
});
exports.default = router;
