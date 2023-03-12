import { body } from 'express-validator';

const uploadFileValidator = [
	body('images').isArray().withMessage('images should be an array'),
];

export { uploadFileValidator };
