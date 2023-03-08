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

const authorisationValidator = [
	body('userId')
		.isMongoId()
		.withMessage('Invalid user id')
		.notEmpty()
		.withMessage('userId is a required field'),
	body('permissions').isArray().withMessage('permissions should be an array'),
	body('permissions.*.module')
		.isMongoId()
		.withMessage('Permission module ID must be a valid MongoDB ID')
		.notEmpty()
		.withMessage('Module in permissions cannot be empty'),
	body('permissions.*.actions')
		.isArray()
		.withMessage('Permission actions must be an array')
		.notEmpty()
		.withMessage('Permission actions must contain at least one entry'),
	body('permissions.*.actions.*')
		.isMongoId()
		.withMessage('Permission action ID must be a valid MongoDB ID'),
];

export {
	signupValidator,
	signinValidator,
	userUpdateValidator,
	authorisationValidator,
};
