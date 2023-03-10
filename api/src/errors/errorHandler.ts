import { Request, Response, NextFunction } from 'express';
import { CustomError } from './customError';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}
	console.log('Something went wrong', err);

	res.status(400).send({
		message: err.message,
	});
};
