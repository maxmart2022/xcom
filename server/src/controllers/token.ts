import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';

const refreshTokenController = async (req: Request, res: Response) => {
	if (!req.currentUser || !req.currentUser.isActive) {
		throw new NotAuthorizedError();
	}

	const access_token = jwt.sign(req.currentUser, process.env.JWT_KEY!, {
		expiresIn: '5m',
	});

	res.status(201).send(access_token);
};

export { refreshTokenController };
