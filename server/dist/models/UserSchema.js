"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    phone: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    access_token: String,
    orders: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    address: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
