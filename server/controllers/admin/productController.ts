import { Request, Response } from "express";
import CategorySchema from "../../models/CategorySchema";
import Product from "../../models/ProductSchema";
import SubCategorySchema from "../../models/SubCategorySchema";
import mkdirp from "mkdirp";
import ResizeImg from "resize-img";
import fs from "fs-extra";
import paginatedResults from "../../helper/pagination";
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
    let imagesArray;
    if (req.files)
      imagesArray = Object.keys((req as any).files).map(
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

    imagesArray?.map((imageFile, i) => {
      if ((req as any).files[`image_${i + 1}`]) {
        var productImage = (req as any)?.files[`image_${i + 1}`];
        var path = "./public/product_images/" + product._id + "/" + imageFile;
        productImage?.mv(path);
      }
    });

    res.status(200).json({ product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const filter: any = JSON.parse((req.query.filter as string) || "{}");
    if (!filter.status) delete filter.status;

    const data = await paginatedResults(
      Product,
      page as string,
      limit as string,
      filter
    );
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
    _id,
  } = req.body;
  try {
    console.log("check this", req.files);

    let imagesArray = [null, null, null, null];
    if (req.files) {
      Object.keys((req as any)?.files).forEach(
        (itm, index) =>
          (imagesArray[index] = (req as any)?.files[itm]?.name.replace(
            /\s/g,
            ""
          ))
      );
    }
    let categoryExists = await CategorySchema.findOne({ name: category });
    let subCategoryExists = await SubCategorySchema.findOne({
      name: subCategory,
    });
    if (!categoryExists || !subCategoryExists) {
      return res.status(400).json({ msg: "Category does not exists" });
    }

    // fs.remove("./public/product_images/" + _id + "/" + image[0], (err) => {
    //   if (err) console.log(err);
    // });

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
        image: imagesArray,
      },
      { old: true }
    ).exec();
    imagesArray?.map(async (imageFile, i) => {
      if (imageFile && (req as any).files[`image_${i + 1}`]) {
        try {
          console.log("came in try block");

          var productImage = (req as any)?.files[`image_${i + 1}`];
          var path = "./public/product_images/" + updated._id + "/" + imageFile;
          await productImage.mv(path);
          updated.image[i] = imageFile;
        } catch (e) {
          console.log("came inthe catch block");
          createFolderAndAddImage(req, updated, imageFile, i);
        }
      }
    });
    console.log("updated", updated);
    await updated.save();
    res.send(updated);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error Occured");
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

async function createFolderAndAddImage(
  req: any,
  updated: any,
  imageFile: any,
  i: any
) {
  console.log("came inthe function");

  await mkdirp("./public/product_images/" + updated._id)
    .catch((err) => {
      console.log(err);
    })
    .then((p) => console.log(`made dir staring with ${p}`));

  var productImage = (req as any)?.files[`image_${i + 1}`];
  var path = "./public/product_images/" + updated._id + "/" + imageFile;
  productImage?.mv(path);
  if (updated.image.length < 4) {
    updated.image.unshift(imageFile);
  } else {
    updated.image.pop();
    updated.image.unshift(imageFile);
  }
}