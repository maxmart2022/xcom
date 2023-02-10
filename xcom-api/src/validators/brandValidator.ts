import { body } from "express-validator";

const brandsValidator = [
  body("name").notEmpty().withMessage("Name is a required field"),
];

export { brandsValidator };
