import { CustomError } from './customError';

export class AccessForbidden extends CustomError {
	statusCode = 403;

	constructor(public message: string = 'Not allowed') {
		super(message);
		Object.setPrototypeOf(this, AccessForbidden.prototype);
	}

	serializeErrors() {
		return [
			{
				message: this.message,
			},
		];
	}
}
