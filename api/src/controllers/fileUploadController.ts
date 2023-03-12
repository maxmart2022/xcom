import { Request, Response } from 'express';
import multer from 'multer';
import { BadRequestError } from '../errors';

interface MulterRequest extends Request {
	fileValidationError?: string;
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Set the destination directory based on the file type
		if (file.mimetype.startsWith('image')) {
			cb(null, 'uploads/images');
		} else if (file.mimetype === 'application/pdf') {
			cb(null, 'uploads/pdfs');
		} else {
			throw new BadRequestError('Invalid file types');
		}
	},
	filename: function (req, file, cb) {
		// Use the original filename with a timestamp prefix
		const timestamp = Date.now().toString();
		const filename = `${timestamp}-${file.originalname}`;
		cb(null, filename);
	},
});

// Create the multer instance with the storage configuration
const upload = multer({
	storage: storage,
	fileFilter: (req: MulterRequest, file, cb) => {
		const acceptedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
		if (!acceptedMimeTypes.includes(file.mimetype)) {
			req.fileValidationError = 'Invalid file type';
			return cb(null, false);
		}
		cb(null, true);
	},
	limits: {
		fileSize: 100 * 1024, // 100 KB in bytes
	},
});

// Define a route handler for uploading files
const uploadFileController = (req: Request, res: Response) => {
	// if (!req.files || req.files.length === 0) {
	// 	throw new Error('Please upload at least one file');
	// }
	// Use the upload middleware with a multiple file field named "images"
	upload.array('images')(req, res, (err: any) => {
		if (err) {
			return res.status(400).send({ message: err.message });
		}
		// Return the uploaded file paths
		const files = req.files as Express.Multer.File[];
		if (!files) throw new BadRequestError('No files found');
		const filePaths = files.map((file) => file.path);
		return res.send({ paths: filePaths });
	});
};

export { upload, uploadFileController };
