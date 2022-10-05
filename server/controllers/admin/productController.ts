import { Request, Response } from "express";
import CategorySchema from "../../models/CategorySchema";
import Product from "../../models/ProductSchema";
import SubCategorySchema from "../../models/SubCategorySchema";

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    displayPrice,
    discountedPrice,
    shippingPrice,
    stock,
    category,
    subCategory,
    image,
  } = req.body;
  try {
    let categoryExists = await CategorySchema.findOne({ name: category });
    let subCategoryExists = await SubCategorySchema.findOne({
      name: subCategory,
    });
    if (!categoryExists || !subCategoryExists) {
      return res.status(400).json({ msg: "Category does not exists" });
    }
    const product = await Product.create({
      name,
      description,
      price,
      displayPrice,
      discountedPrice,
      shippingPrice,
      stock,
      category,
      subCategory,
      image,
    });
    res.status(200).json({ product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const data = await Product.find({}).exec();
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    displayPrice,
    discountedPrice,
    shippingPrice,
    stock,
    category,
    subCategory,
    image,
    id,
  } = req.body;
  try {
    let categoryExists = await CategorySchema.findOne({ name: category });
    let subCategoryExists = await SubCategorySchema.findOne({
      name: subCategory,
    });
    if (!categoryExists || !subCategoryExists) {
      return res.status(400).json({ msg: "Category does not exists" });
    }

    const updated = await Product.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        price,
        displayPrice,
        discountedPrice,
        shippingPrice,
        stock,
        category,
        subCategory,
        image,
      },
      { new: true }
    ).exec();
    res.send(updated);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const deleted = await Product.findByIdAndDelete({ _id: id }).exec();
    res.send(deleted);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
