import { Request, Response } from "express";
import User from "../../models/UserSchema";

export const GetUserList = async (req: Request, res: Response) => {
  try {
    const userList = await User.find({}).exec();
    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json(err);
  }
};
