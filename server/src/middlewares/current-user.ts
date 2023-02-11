import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';

interface UserPayload {
	email: string;
	_id: string;
	isActive: boolean;
	isSuperUser: boolean;
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
	const token = req.header('x-access-token');
	if (!token) {
		throw new NotAuthorizedError();
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
		req.currentUser = payload;
	} catch (ex) {}

	next();
};
