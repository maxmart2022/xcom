import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";

interface UserPayload {
  email: string;
  id: string;
  isActive: boolean;
  isSuperUser: boolean;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.header("x-access-token") || req.header("x-refresh-token");
  if (!authHeader) {
    throw new NotAuthorizedError();
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new NotAuthorizedError();
  }

  let secret = req.header("x-refresh-token")
    ? process.env.REFRESH_TOKEN!
    : process.env.JWT_KEY!;

  try {
    const payload = jwt.verify(token, secret) as UserPayload;
    req.currentUser = payload;
  } catch (ex) {
    throw new NotAuthorizedError();
  }

  next();
};
