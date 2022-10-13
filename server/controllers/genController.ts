import { Request, Response } from "express";
import Product from "../models/ProductSchema";
export const getProducts = async (req: Request, res: Response) => {
  try {
    const filter = JSON.parse((req.query.filter as string) || "{}");

    const data = await Product.find(filter).exec();
    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const data = await Product.findById(req.params.id).exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
