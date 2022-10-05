import { check } from "express-validator";

export const validateCategory = [
  check("name", "Name is required").not().isEmpty(),
];

export const validateUpdateCategory = [
  check("name", "Name is required").not().isEmpty(),
  check("id", "Id is required").not().isEmpty(),
];

export const validateSubCategory = [
  check("name", "Name is required").not().isEmpty(),
  check("parent", "Parent is required").not().isEmpty(),
];

export const validateUpdateSubCategory = [
  check("name", "Name is required").not().isEmpty(),
  check("parent", "Parent is required").not().isEmpty(),
  check("id", "Id is required").not().isEmpty(),
];
