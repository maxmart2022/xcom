import { body } from 'express-validator';

const signupValidator = [
	body('email').isEmail().withMessage('Email not valid'),
	body('role').isString().optional().withMessage('Role must be a string'),
	body('password')
		.trim()
		.isLength({ min: 5, max: 25 })
		.withMessage('Password must be between 5 and 29 chars'),
];

const signinValidator = [
	body('email').isEmail().withMessage('Email not valid'),
	body('password')
		.trim()
		.isLength({ min: 5, max: 25 })
		.withMessage('Password must be between 5 and 29 chars'),
];

const userUpdateValidator = [
	body('email').isEmail().withMessage('Email not valid'),
	body('role').isString().optional().withMessage('Role must be a string'),
	body('isActive').isBoolean().optional().withMessage('Must be a boolean'),
];

export { signupValidator, signinValidator, userUpdateValidator };
