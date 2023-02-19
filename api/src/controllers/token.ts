import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";

const refreshTokenController = async (req: Request, res: Response) => {
  if (!req.currentUser || !req.currentUser.isActive) {
    console.log("No current user");
    throw new NotAuthorizedError();
  }

  const expiresAt = Math.floor(Date.now() / 1000 + 5 * 60);
  const access_token = jwt.sign(req.currentUser, process.env.JWT_KEY!);

  res.status(201).send({ access_token, expiresAt });
};

export { refreshTokenController };
