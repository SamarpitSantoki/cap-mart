"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    displayPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 50,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: false,
    },
    image: {
        type: [String],
        required: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.models.Product ||
    mongoose_1.default.model("Product", ProductSchema);
