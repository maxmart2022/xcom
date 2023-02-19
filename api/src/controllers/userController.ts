import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { User } from '../models/userModel';
import { Module } from '../models/moduleModel';
import { Action } from '../models/actionModel';
import { BadRequestError } from '../errors';
import { Password } from '../services/password';
import { roles } from '../constants/roles';

const listUsersController = async (req: Request, res: Response) => {
	const users = await User.find({})
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
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) throw new BadRequestError('Invalid Credentials');

	const isPasswordMatch = await Password.comparePasswords(
		password,
		user.password
	);
	if (!isPasswordMatch) throw new BadRequestError('Invalid Credentials');

	const access_token = User.generateAuthToken(
		user,
		process.env.JWT_KEY!,
		5 * 60
	);

	const refresh_token = User.generateAuthToken(
		user,
		process.env.REFRESH_TOKEN!,
		48 * 60 * 60
	);

	const expiresAt = Math.floor(Date.now() / 1000 + 5 * 60);

	res
		.status(201)
		.send({ access_token, type: 'Bearer', refresh_token, expiresAt });
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
	let { role } = req.body;
	if (typeof role === 'undefined') role = roles.USER;

	user.set({ email, role });
	await user.save();

	res.status(200).send(user);
};

export {
	listUsersController,
	signupController,
	signinController,
	viewUserController,
	updateUserController,
};