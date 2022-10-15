import { Request, Response } from "express";
import CategorySchema from "../../models/CategorySchema";
import Product from "../../models/ProductSchema";
import SubCategorySchema from "../../models/SubCategorySchema";
import mkdirp from "mkdirp";
import ResizeImg from "resize-img";
import multer from "multer";
import fs from "fs-extra";
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
  } = req.body;
  try {
    console.log("check");
    console.log(req.files);

    const imagesArray = Object.keys((req as any).files).map(
      (itm) => (req as any).files[itm].name
    );

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
      image: imagesArray,
    });

    await mkdirp("./public/product_images/" + product._id)
      .catch((err) => {
        console.log(err);
      })
      .then((p) => console.log(`made dir staring with ${p}`));
    await mkdirp("./public/product_images/" + product._id + "/gallery")
      .catch((err) => {
        console.log(err);
      })
      .then((p) => console.log(`made dir staring with ${p}`));
    await mkdirp("./public/product_images/" + product._id + "/gallery/thumbs")
      .catch((err) => {
        console.log(err);
      })
      .then((p) => console.log(`made dir staring with ${p}`));

    imagesArray.map((imageFile, i) => {
      var productImage = (req as any).files?.[`image${i + 1}`];
      var path = "./public/product_images/" + product._id + "/" + imageFile;
      productImage.mv(path);
    });

    res.status(200).json({ product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
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
    _id,
  } = req.body;
  try {
    console.log(req.files);

    const imagesArray = Object.keys((req as any).files).map(
      (itm) => (req as any).files[itm].name
    );
    let categoryExists = await CategorySchema.findOne({ name: category });
    let subCategoryExists = await SubCategorySchema.findOne({
      name: subCategory,
    });
    if (!categoryExists || !subCategoryExists) {
      return res.status(400).json({ msg: "Category does not exists" });
    }

    fs.remove("./public/product_images/" + _id + "/" + image[0], (err) => {
      if (err) console.log(err);
    });

    const updated = await Product.findByIdAndUpdate(
      { _id: _id },
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
        image: ImageData,
      },
      { new: true }
    ).exec();
    imagesArray.map((imageFile, i) => {
      var productImage = (req as any).files?.[`image${i + 1}`];
      var path = "./public/product_images/" + updated._id + "/" + imageFile;
      productImage.mv(path);
    });
    res.send(updated);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await Product.findByIdAndDelete({ _id: id }).exec();
    res.send(deleted);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateStock = async (id: string, count: number) => {
  const product = await Product.findById(id);
  if (product) {
    product.stock = product.stock - count;
    await product.save();
  }
};
