"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SubCategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    parent: {
        type: String,
        required: true,
    },
    parentSlug: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.models.SubCategory ||
    mongoose_1.default.model("SubCategory", SubCategorySchema);
