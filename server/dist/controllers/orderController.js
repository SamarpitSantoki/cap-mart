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
exports.deleteOrder = exports.updateOrder = exports.getOrder = exports.getOrders = exports.createOrder = void 0;
const OrderSchema_1 = __importDefault(require("../models/OrderSchema"));
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const ProductSchema_1 = __importDefault(require("../models/ProductSchema"));
const productController_1 = require("./admin/productController");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, address, cartItems, paymentMethod } = req.body;
    try {
        // check if price of each item is correct
        const items = yield Promise.all(cartItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield ProductSchema_1.default.findById(item._id);
            if (product) {
                if (product.discountedPrice !== item.price) {
                    item.price = product.discountedPrice;
                    item.total = product.price * item.count;
                }
                item.category = product.category;
                item.subCategory = product.subCategory;
                item.shippingCharge = product.shippingCharge;
                item.discountedPrice = product.discountedPrice;
                item.price = product.price;
                console.log("item", item);
                return item;
            }
            else {
                return null;
            }
        })));
        const filteredItems = items.filter((item) => item !== null);
        console.log("filteredItems", filteredItems);
        const totalPrice = items.reduce((acc, item) => acc + item.price * item.count, 0);
        const order = new OrderSchema_1.default({
            name,
            email,
            phone,
            address,
            total: totalPrice,
            cartItems: filteredItems,
            paymentMethod,
        });
        console.log("order", order);
        const savedOrder = yield order.save();
        res.status(200).send(savedOrder);
        // add Order to User History
        yield UserSchema_1.default.findOneAndUpdate({ email }, { $push: { orders: savedOrder._id } }).exec();
        //  update the stock of items
        cartItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, productController_1.updateStock)(item._id, item.count);
        }));
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = JSON.parse(req.query.filter || "{}");
        const orders = yield OrderSchema_1.default.find(filter).sort({ createdAt: -1 }).exec();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getOrders = getOrders;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield OrderSchema_1.default.findById(req.params.id);
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getOrder = getOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, address, phone, email } = req.body;
        const order = yield OrderSchema_1.default.findByIdAndUpdate(req.params.id, {
            status,
            address,
            phone,
            email,
        }, { new: true });
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield OrderSchema_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.deleteOrder = deleteOrder;
