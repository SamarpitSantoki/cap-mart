import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/UserSchema";
import generateJWT from "../middlewares/generateToken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    user = new User({
      name,
      email,
      phone,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    const token = await generateJWT(payload);
    user.access_token = token.token;
    await user.save();
    res.status(200).send({
      name: user.name,
      email: user.email,
      access_token: user.access_token,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    const token = await generateJWT(payload);
    user.access_token = token.token;
    await user.save();
    res.status(200).send({
      name: user.name,
      email: user.email,
      access_token: user.access_token,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const logout = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    await User.findOneAndUpdate(
      {
        email,
      },
      {
        access_token: "",
      },
      {
        new: true,
      }
    );
    res.status(200).send("Logout Successfully");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};