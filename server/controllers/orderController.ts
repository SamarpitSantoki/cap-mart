import { Request, Response } from "express";
import Order from "../models/OrderSchema";
import User from "../models/UserSchema";
import ProductSchema from "../models/ProductSchema";
import { updateStock } from "./admin/productController";

export const createOrder = async (req: Request, res: Response) => {
  const { name, email, phone, address, cartItems, paymentMethod } = req.body;
  try {
    // check if price of each item is correct
    const items = await Promise.all(
      cartItems.map(async (item: any) => {
        const product = await ProductSchema.findById(item._id);
        if (product) {
          if (product.discountedPrice !== item.price) {
            item.price = product.discountedPrice;
            item.total = product.price * item.count;
          }
          item.category = product.category;
          item.subCategory = product.subCategory;
          item.shippingCharge = product.shippingCharge;
          item.discountedPrice = product.discountedPrice;
          item.price = product.price;
          console.log("item", item);
          return item;
        } else {
          return null;
        }
      })
    );

    const filteredItems = items.filter((item: any) => item !== null);

    console.log("filteredItems", filteredItems);
    const totalPrice = items.reduce(
      (acc: any, item: any) => acc + item.price * item.count,
      0
    );

    const order = new Order({
      name,
      email,
      phone,
      address,
      total: totalPrice,
      cartItems: filteredItems,
      paymentMethod,
    });
    console.log("order", order);

    const savedOrder = await order.save();
    res.status(200).send(savedOrder);

    // add Order to User History
    await User.findOneAndUpdate(
      { email },
      { $push: { orders: savedOrder._id } }
    ).exec();

    //  update the stock of items
    cartItems.map(async (item: any) => {
      await updateStock(item._id, item.count);
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const filter: {} = JSON.parse((req.query.filter as string) || "{}");

    const orders = await Order.find(filter).sort({ createdAt: -1 }).exec();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { status, address, phone, email } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        address,
        phone,
        email,
      },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
