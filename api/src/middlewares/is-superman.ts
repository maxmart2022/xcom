import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const isSuperman = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.currentUser || !req.currentUser.isSuperUser)
		throw new NotAuthorizedError();
	next();
};
