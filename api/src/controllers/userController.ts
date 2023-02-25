import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Action, Module, User } from '../models';
import { BadRequestError } from '../errors';
import { Password } from '../services/password';
import { roles } from '../constants/roles';

const listUsersController = async (req: Request, res: Response) => {
	const users = await User.find({ isSuperUser: false })
		.populate({
			path: 'permissions.module',
			model: Module,
		})
		.populate({
			path: 'permissions.actions',
			model: Action,
		});
	res.status(200).send(users);
};

const signupController = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	let { role } = req.body;

	const emailExists = await User.findOne({ email });
	if (emailExists) throw new BadRequestError('Email exists');

	if (role === process.env.SUPERADMIN_ROLE!)
		throw new BadRequestError('Invalid role');

	if (typeof role === 'undefined') role = roles.GUEST;

	const user = User.build({ email, password });
	user.role = role;
	await user.save();

	res.status(201).send(user);
};

const signinController = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) throw new BadRequestError('Invalid Credentials');

	if (!user.isActive) throw new BadRequestError('Account not active');

	const isPasswordMatch = await Password.comparePasswords(
		password,
		user.password
	);
	if (!isPasswordMatch) throw new BadRequestError('Invalid Credentials');

	const access_token = User.generateAuthToken(
		user,
		process.env.JWT_KEY!,
		15 * 60
	);

	const refresh_token = User.generateAuthToken(
		user,
		process.env.REFRESH_TOKEN!,
		24 * 60 * 60
	);
	let newRefreshTokenArray = !cookies?.jwt
		? user.refreshToken
		: user.refreshToken.filter((rt) => rt !== cookies.jwt);

	if (cookies?.jwt) {
		const refreshToken = cookies.jwt;
		const foundToken = await User.findOne({ refreshToken }).exec();

		if (!foundToken) {
			newRefreshTokenArray = [];
		}

		res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
	}

	user.refreshToken = [...newRefreshTokenArray, refresh_token];
	await user.save();

	res.cookie('jwt', refresh_token, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 24 * 60 * 60 * 1000,
	});

	const expiresAt = Math.floor(Date.now() / 1000 + 15 * 60);
	const refreshTokenVersion = user.refreshTokenVersion;

	res
		.status(201)
		.send({ access_token, type: 'Bearer', expiresAt, refreshTokenVersion });
};

const viewUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.params.id;
	if (!isValidObjectId(userId)) throw new BadRequestError('Invalid user');

	const user = await User.findById(userId);
	if (!user) throw new BadRequestError('Invalid user');

	res.status(200).send(user);
};

const updateUserController = async (req: Request, res: Response) => {
	const userId = req.params.id;
	if (!isValidObjectId(userId)) throw new BadRequestError('Invalid user');

	const user = await User.findById(userId);
	if (!user) throw new BadRequestError('Invalid user');

	const { email } = req.body;
	// email unique validation
	const emailExists = await User.findOne({ email, _id: { $ne: userId } });
	if (emailExists) throw new BadRequestError('Email exists');
	let { role } = req.body;
	if (typeof role === 'undefined') role = roles.GUEST;

	user.set({ email, role });
	await user.save();

	res.status(200).send(user);
};

const suspendOrActivateUserController = async (req: Request, res: Response) => {
	const userId = req.params.id;
	if (!isValidObjectId(userId)) throw new BadRequestError('Invalid user');

	const user = await User.findById(userId);
	if (!user) throw new BadRequestError('Invalid user');

	await User.findByIdAndUpdate(
		userId,
		{ isActive: req.body.isActive },
		{ new: true }
	);

	res.status(200).send(user);
};

const deleteUserController = async (req: Request, res: Response) => {
	const userId = req.params.id;
	if (!isValidObjectId(userId)) throw new BadRequestError('Invalid User');

	const user = await User.findById(userId);
	if (!user) throw new BadRequestError('Invalid User');

	await User.findByIdAndDelete(userId);
	res.status(200).send(user);
};
export {
	listUsersController,
	signupController,
	signinController,
	viewUserController,
	updateUserController,
	suspendOrActivateUserController,
	deleteUserController,
};
