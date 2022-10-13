import { check } from "express-validator";
export const validateOrder = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("phone", "Phone is required").not().isEmpty(),
  check("address", "Address is required").not().isEmpty(),
  check("cartItems", "Cart Items is required").not().isEmpty(),
];
