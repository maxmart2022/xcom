import { body } from "express-validator";

export const categoryValidator = [
  body("name").notEmpty().withMessage("Name is a required field"),
  body("parent").optional().isArray().withMessage("Parent must be an array"),
];

// export { categoryValidator };
