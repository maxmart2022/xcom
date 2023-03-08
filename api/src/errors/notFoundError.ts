import { CustomError } from './customError';

export class NotFoundError extends CustomError {
	statusCode = 404;

	constructor() {
		super('URL not found');

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors() {
		return [{ message: 'URL Does not exists' }];
	}
}
