import express from 'express';
import {
	listUsers,
	signin,
	signup,
	updateUser,
	viewUser,
} from '../controllers/user';
import { currentUser } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';
import {
	signinValidator,
	signupValidator,
	userUpdateValidator,
} from '../validators/auth';

const router = express.Router();

router.post('/api/auth/signup', signupValidator, validateRequest, signup);
router.post('/api/auth/signin', signinValidator, validateRequest, signin);
router.get('/api/auth/list', currentUser, listUsers);
router.get('/api/auth/view/:id', currentUser, viewUser);
router.put(
	'/api/auth/update/:id',
	currentUser,
	userUpdateValidator,
	validateRequest,
	updateUser
);
router.get('/api/auth/currentUser', currentUser, (req, res) => {
	res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as authRouter };
