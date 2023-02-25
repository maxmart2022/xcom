import express from 'express';
import {
	deleteUserController,
	listUsersController,
	signinController,
	signupController,
	suspendOrActivateUserController,
	updateUserController,
	viewUserController,
} from '../controllers';
import { currentUser, validateRequest } from '../middlewares';
import {
	signinValidator,
	signupValidator,
	userUpdateValidator,
} from '../validators/auth';

const router = express.Router();

router.post(
	'/api/auth/signup',
	signupValidator,
	validateRequest,
	signupController
);
router.post(
	'/api/auth/signin',
	signinValidator,
	validateRequest,
	signinController
);
router.get('/api/auth/list', currentUser, listUsersController);
router.get('/api/auth/view/:id', currentUser, viewUserController);
router.put(
	'/api/auth/update/:id',
	currentUser,
	userUpdateValidator,
	validateRequest,
	updateUserController
);
router.put(
	'/api/auth/suspend/:id',
	currentUser,
	suspendOrActivateUserController
);
router.delete('/api/auth/delete/:id', currentUser, deleteUserController);
router.get('/api/auth/currentUser', currentUser, (req, res) => {
	res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as authRouter };
