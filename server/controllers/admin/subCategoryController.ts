import { Request, Response } from "express";
import { Error, Types } from "mongoose";
import CategorySchema from "../../models/CategorySchema";
import SubCategorySchema from "../../models/SubCategorySchema";

export const createSubCategory = async (req: Request, res: Response) => {
  const { name, parent } = req.body;
  try {
    let slug = name.toLowerCase().replace(/ /g, "-");
    let parentSlug = parent.toLowerCase().replace(/ /g, "-");
    const category = await SubCategorySchema.findOne({ slug }).exec();

    if (category) {
      return res.status(400).json({
        error: "Category already exists",
      });
    }

    const parentCategory = await CategorySchema.findOne({ slug: parentSlug });

    if (!parentCategory) {
      return res.status(400).json({
        error: "Parent category does not exist",
      });
    }
    const newCategory = new SubCategorySchema({
      name,
      slug,
      parent,
      parentSlug,
    });

    await newCategory.save((err: any, data: Object) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const getSubCategory = async (req: Request, res: Response) => {
  try {
    const data = await SubCategorySchema.find({}).exec();
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateSubCategory = async (req: Request, res: Response) => {
  const { name, id, parent } = req.body;
  let slug = name.toLowerCase().replace(/ /g, "-");
  let parentSlug = parent.toLowerCase().replace(/ /g, "-");
  try {
    const parentCategory = await CategorySchema.findOne({
      slug: parentSlug,
    }).exec();
    if (!parentCategory) {
      return res.status(400).json({
        error: "Parent category does not exist",
      });
    }
    const updated = await SubCategorySchema.findByIdAndUpdate(
      { _id: id },
      {
        name,
        slug,
        parent: parentCategory.name,
        parentSlug: parentCategory.slug,
      },
      { new: true }
    ).exec();
    res.status(200).send(updated);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
