"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = void 0;
const ProductSchema_1 = __importDefault(require("../models/ProductSchema"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = JSON.parse((_a = req.query.filter) !== null && _a !== void 0 ? _a : "{}");
        //  delete empty key from filter
        if (!filter.name) {
            delete filter.name;
        }
        if (filter.name) {
            const temp = filter.name;
            filter.name = { $regex: temp, $options: "i" };
        }
        if (!filter.category) {
            delete filter.category;
        }
        if (!filter.subCategory) {
            delete filter.subCategory;
        }
        const data = yield ProductSchema_1.default.find(filter).exec();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield ProductSchema_1.default.findById(req.params.id).exec();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getProduct = getProduct;
