import { Request, Response } from "express";
import { Error } from "mongoose";
import CategorySchema from "../../models/CategorySchema";

export const createCategory = (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    let slug = name.toLowerCase().replace(/ /g, "-");

    CategorySchema.findOne({ slug }).exec((err, category) => {
      if (category) {
        return res.status(400).json({
          error: "Category already exists",
        });
      }

      const newCategory = new CategorySchema({ name, slug });

      newCategory.save((err: Error, data: Object) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.json(data);
      });
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const data = await CategorySchema.find({}).exec();
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { name, id } = req.body;
  let slug = name.toLowerCase().replace(/ /g, "-");
  try {
    const updated = await CategorySchema.findByIdAndUpdate(
      { _id: id },
      { name, slug },
      { new: true }
    ).exec();
    res.send(updated);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await CategorySchema.findByIdAndDelete({ _id: id }).exec();
    res.send(deleted);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
