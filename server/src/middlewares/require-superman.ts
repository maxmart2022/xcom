import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { findSuperman } from '../models/user';

export const requireSuperman = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const superman = findSuperman();
	if (!superman) {
		console.log('No Superman');
		throw new NotAuthorizedError();
	}
	next();
};
