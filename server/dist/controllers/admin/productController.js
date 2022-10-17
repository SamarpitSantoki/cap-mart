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
exports.updateStock = exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const CategorySchema_1 = __importDefault(require("../../models/CategorySchema"));
const ProductSchema_1 = __importDefault(require("../../models/ProductSchema"));
const SubCategorySchema_1 = __importDefault(require("../../models/SubCategorySchema"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, displayPrice, discountedPrice, shippingPrice, stock, category, subCategory, } = req.body;
    try {
        console.log("check");
        console.log(req.files);
        const imagesArray = Object.keys(req.files).map((itm) => req.files[itm].name);
        let categoryExists = yield CategorySchema_1.default.findOne({ name: category });
        let subCategoryExists = yield SubCategorySchema_1.default.findOne({
            name: subCategory,
        });
        if (!categoryExists || !subCategoryExists) {
            return res.status(400).json({ msg: "Category does not exists" });
        }
        const product = yield ProductSchema_1.default.create({
            name,
            description,
            price,
            displayPrice,
            discountedPrice,
            shippingPrice,
            stock,
            category,
            subCategory,
            image: imagesArray,
        });
        yield (0, mkdirp_1.default)("./public/product_images/" + product._id)
            .catch((err) => {
            console.log(err);
        })
            .then((p) => console.log(`made dir staring with ${p}`));
        yield (0, mkdirp_1.default)("./public/product_images/" + product._id + "/gallery")
            .catch((err) => {
            console.log(err);
        })
            .then((p) => console.log(`made dir staring with ${p}`));
        yield (0, mkdirp_1.default)("./public/product_images/" + product._id + "/gallery/thumbs")
            .catch((err) => {
            console.log(err);
        })
            .then((p) => console.log(`made dir staring with ${p}`));
        imagesArray.map((imageFile, i) => {
            var _a;
            var productImage = (_a = req.files) === null || _a === void 0 ? void 0 : _a[`image${i + 1}`];
            var path = "./public/product_images/" + product._id + "/" + imageFile;
            productImage.mv(path);
        });
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield ProductSchema_1.default.find({}).exec();
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.getProducts = getProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, displayPrice, discountedPrice, shippingPrice, stock, category, subCategory, image, _id, } = req.body;
    try {
        console.log(req.files);
        const imagesArray = Object.keys(req.files).map((itm) => req.files[itm].name);
        let categoryExists = yield CategorySchema_1.default.findOne({ name: category });
        let subCategoryExists = yield SubCategorySchema_1.default.findOne({
            name: subCategory,
        });
        if (!categoryExists || !subCategoryExists) {
            return res.status(400).json({ msg: "Category does not exists" });
        }
        fs_extra_1.default.remove("./public/product_images/" + _id + "/" + image[0], (err) => {
            if (err)
                console.log(err);
        });
        const updated = yield ProductSchema_1.default.findByIdAndUpdate({ _id: _id }, {
            name,
            description,
            price,
            displayPrice,
            discountedPrice,
            shippingPrice,
            stock,
            category,
            subCategory,
            image: ImageData,
        }, { new: true }).exec();
        imagesArray.map((imageFile, i) => {
            var _a;
            var productImage = (_a = req.files) === null || _a === void 0 ? void 0 : _a[`image${i + 1}`];
            var path = "./public/product_images/" + updated._id + "/" + imageFile;
            productImage.mv(path);
        });
        res.send(updated);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield ProductSchema_1.default.findByIdAndDelete({ _id: id }).exec();
        res.send(deleted);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.deleteProduct = deleteProduct;
const updateStock = (id, count) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductSchema_1.default.findById(id);
    if (product) {
        product.stock = product.stock - count;
        yield product.save();
    }
});
exports.updateStock = updateStock;
