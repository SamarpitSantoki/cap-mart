import { Request, Response } from "express";
import Product from "../models/ProductSchema";
export const getProducts = (req: Request, res: Response) => {
  try {
    const filter = JSON.parse((req.query.filter as string) || "{}");

    const data = Product.find(filter).exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getProduct = (req: Request, res: Response) => {
  try {
    const data = Product.findById(req.params.id).exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
