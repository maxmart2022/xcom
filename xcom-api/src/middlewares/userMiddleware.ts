import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "@shabeebm369/common";
import { User } from "../models/userModel";

// validate superman existance
export const requireSuperman = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const supermanExists = await User.findOne({
    email: process.env.SUPERADMIN_EMAIL!,
    role: process.env.SUPERADMIN_ROLE!,
  });

  if (!supermanExists) throw new NotAuthorizedError();

  next();
};
