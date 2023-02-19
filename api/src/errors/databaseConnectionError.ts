import { CustomError } from './customError';

export class DatabaseConnectionError extends CustomError {
	statusCode = 500;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors() {
		return [
			{
				message: this.message,
			},
		];
	}
}
