import { check, header } from "express-validator";

export const validateRegister = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 8 or more characters"
  ).isLength({ min: 6 }),
];

export const validateLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];
