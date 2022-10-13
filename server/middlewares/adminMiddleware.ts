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

export const validateProduct = [
  check("name", "Name is required").not().isEmpty(),
  check("description", "Description is required").not().isEmpty(),
  check("price", "Price is required").not().isEmpty(),
  check("displayPrice", "Display Price is required").not().isEmpty(),
  check("discountedPrice", "Discounted Price is required").not().isEmpty(),
  check("category", "Category is required").not().isEmpty(),
  check("subCategory", "Sub Category is required").not().isEmpty(),
];

export const validateUpdateProduct = [
  check("id", "Id is required").not().isEmpty(),
];
