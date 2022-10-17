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
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.createCategory = void 0;
const CategorySchema_1 = __importDefault(require("../../models/CategorySchema"));
const createCategory = (req, res) => {
    const { name } = req.body;
    try {
        let slug = name.toLowerCase().replace(/ /g, "-");
        CategorySchema_1.default.findOne({ slug }).exec((err, category) => {
            if (category) {
                return res.status(400).json({
                    error: "Category already exists",
                });
            }
            const newCategory = new CategorySchema_1.default({ name, slug });
            newCategory.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: err,
                    });
                }
                res.json(data);
            });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
exports.createCategory = createCategory;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield CategorySchema_1.default.find({}).exec();
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.getCategory = getCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id } = req.body;
    let slug = name.toLowerCase().replace(/ /g, "-");
    try {
        const updated = yield CategorySchema_1.default.findByIdAndUpdate({ _id: id }, { name, slug }, { new: true }).exec();
        res.send(updated);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield CategorySchema_1.default.findByIdAndDelete({ _id: id }).exec();
        res.send(deleted);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.deleteCategory = deleteCategory;
