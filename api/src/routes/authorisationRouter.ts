import express from 'express';
import {
	authorisationController,
	getPermissionsController,
} from '../controllers';
import { requireAuth, validateRequest } from '../middlewares';
import { authorisationValidator } from '../validators/auth';

const router = express.Router();

router.post(
	'/api/auth/permit',
	authorisationValidator,
	validateRequest,
	requireAuth,
	authorisationController
);

router.get(
	'/api/auth/permit/list/:userId',
	requireAuth,
	getPermissionsController
);

export { router as authorisationRouter };
