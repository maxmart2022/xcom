import { body } from 'express-validator';

const moduleValidator = [
	body('name').isString().notEmpty().withMessage('Module name required'),
	body('actions')
		.isArray()
		.withMessage('Actions should be an array')
		.notEmpty()
		.withMessage('Actions needed'),
];

export { moduleValidator };
