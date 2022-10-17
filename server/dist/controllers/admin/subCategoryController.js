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
exports.deleteSubCategory = exports.updateSubCategory = exports.getSubCategory = exports.createSubCategory = void 0;
const CategorySchema_1 = __importDefault(require("../../models/CategorySchema"));
const SubCategorySchema_1 = __importDefault(require("../../models/SubCategorySchema"));
const createSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, parent } = req.body;
    try {
        let slug = name.toLowerCase().replace(/ /g, "-");
        let parentSlug = parent.toLowerCase().replace(/ /g, "-");
        const category = yield SubCategorySchema_1.default.findOne({ slug }).exec();
        if (category) {
            return res.status(400).json({
                error: "Category already exists",
            });
        }
        const parentCategory = yield CategorySchema_1.default.findOne({ slug: parentSlug });
        if (!parentCategory) {
            return res.status(400).json({
                error: "Parent category does not exist",
            });
        }
        const newCategory = new SubCategorySchema_1.default({
            name,
            slug,
            parent,
            parentSlug,
        });
        yield newCategory.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            res.json(data);
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
exports.createSubCategory = createSubCategory;
const getSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield SubCategorySchema_1.default.find({}).exec();
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.getSubCategory = getSubCategory;
const updateSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id, parent } = req.body;
    let slug = name.toLowerCase().replace(/ /g, "-");
    let parentSlug = parent.toLowerCase().replace(/ /g, "-");
    try {
        const parentCategory = yield CategorySchema_1.default.findOne({
            slug: parentSlug,
        }).exec();
        if (!parentCategory) {
            return res.status(400).json({
                error: "Parent category does not exist",
            });
        }
        const updated = yield SubCategorySchema_1.default.findByIdAndUpdate({ _id: id }, {
            name,
            slug,
            parent: parentCategory.name,
            parentSlug: parentCategory.slug,
        }, { new: true }).exec();
        res.status(200).send(updated);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.updateSubCategory = updateSubCategory;
const deleteSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const deleted = yield SubCategorySchema_1.default.findByIdAndDelete({
            _id: id,
        }).exec();
        res.status(200).send(deleted);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.deleteSubCategory = deleteSubCategory;
