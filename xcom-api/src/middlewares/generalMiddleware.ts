import { Request, Response, NextFunction } from "express";

// import { Actions, Modules, roles } from "@shabeebm369/common";
import { Authorization } from "../../models/authorization";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Pending
// JWT_SECRET
// Errors

export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid Id.");

  next();
};

export const authenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Acces denied. No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
};

export const asyncHandler = (handler: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};

export const hasPermission = async (
  user: string,
  modules: Modules,
  right: Actions
): Promise<boolean> => {
  const authorization = await Authorization.findOne({ user, modules });
  if (!authorization) {
    return false;
  }
  return authorization.rights.includes(right);
};
