import { Request, Response } from "express";
import { BadRequestError } from "@shabeebm369/common";
// import jwt from "jsonwebtoken";

import { roles } from "../constants/roles";
import { User } from "../models/userModel";
import { Password } from "../helpers/password";

const signUpSuperman = async (req: Request, res: Response) => {
  const email = process.env.SUPERADMIN_EMAIL!;
  const password = process.env.SUPERADMIN_PASSWORD!;
  const role = process.env.SUPERADMIN_ROLE!;

  const isSupermanExists = await User.findOne({ role });
  if (isSupermanExists) {
    throw new BadRequestError("Superman exists!!!");
  }

  const user = User.build({ email, password });
  user.role = role;
  await user.save();

  return res.status(201).send(user);
};

const signUp = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError("Email already in use");

  if (role === roles.SUPERMAN) throw new BadRequestError("Invalid Role");

  const user = User.build({ email, password });
  user.role = role;
  await user.save();

  const userJwt = user.generateAuthToken();

  req.session = {
    jwt: userJwt,
  };

  return res.status(201).send(user);
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestError("Invalid Credentials !!!");

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );
  if (!passwordsMatch) {
    throw new BadRequestError("Invalid Credentials !!!");
  }

  if (!existingUser.isActive) throw new BadRequestError("Account Suspended");

  const userJwt = existingUser.generateAuthToken();

  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(userJwt);
};

const listUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: { $ne: roles.SUPERMANAGER } });
  res.status(200).send(users);
};

export {
  signUp as signUpController,
  signUpSuperman as signUpSupermanController,
  signin as signinController,
  listUsers as listUsersController,
};
