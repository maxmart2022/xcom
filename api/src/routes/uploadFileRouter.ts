import express from 'express';
import { uploadFileController } from '../controllers/fileUploadController';
import { validateRequest } from '../middlewares';
import { uploadFileValidator } from '../validators/fileValidator';

const router = express.Router();

router.post(
	'/api/upload',
	// uploadFileValidator,
	// validateRequest,
	uploadFileController
);

export { router as fileUploadRouter };
