"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    cartItems: {
        type: [Object],
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    paymentMethod: {
        type: String,
        required: true,
        default: "Cash On Delivery",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.models.Order || mongoose_1.default.model("Order", OrderSchema);
