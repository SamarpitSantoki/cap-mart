"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connect_1 = __importDefault(require("../db/connect"));
const authRoute_1 = __importDefault(require("./authRoute"));
const adminRoutes_1 = __importDefault(require("./adminRoutes/"));
const orderRoute_1 = __importDefault(require("./orderRoute"));
const genRoute_1 = __importDefault(require("./genRoute"));
const router = (0, express_1.Router)();
(0, connect_1.default)();
router.use("/auth", authRoute_1.default);
router.use("/admin", adminRoutes_1.default);
router.use("/order", orderRoute_1.default);
router.use("/", genRoute_1.default);
exports.default = router;
