import { body } from "express-validator";

const signUpValidator = [
  body("email").isEmail().withMessage("Email not valid"),
  body("password")
    .trim()
    .isLength({ min: 5, max: 25 })
    .withMessage("Password must be between 5 and 29 chars"),
];

const signInValidator = [
  body("email").isEmail().withMessage("Email not valid"),
  body("password")
    .trim()
    .isLength({ min: 5, max: 25 })
    .withMessage("Password must be between 5 and 29 chars"),
];

const userUpdateValidator = [
  body("email").isEmail().withMessage("Email not valid"),
  body("role").isString().optional().withMessage("Role must be a string"),
  body("isActive").isBoolean().optional().withMessage("Must be a boolean"),
];

export { signUpValidator, signInValidator, userUpdateValidator };
