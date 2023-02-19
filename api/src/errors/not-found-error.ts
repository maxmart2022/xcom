import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
	statusCode = 404;

	constructor() {
		super('URL not found');

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors() {
		if (this.statusCode === 404) {
			return [{ message: 'URL Does not exists' }];
		}
		return [{ message: 'Method not allowed' }];
	}
}
