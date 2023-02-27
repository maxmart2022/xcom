import { Request, Response } from 'express';
import { isValidObjectId, ObjectId } from 'mongoose';
import { BadRequestError } from '../errors';
import { Module, User } from '../models';

const authorisationController = async (req: Request, res: Response) => {
	const {
		userId,
		permissions,
	}: {
		userId: ObjectId;
		permissions: [{ module: ObjectId; actions: [ObjectId] }];
	} = req.body;

	// Validating body
	if (!isValidObjectId(userId)) throw new BadRequestError('Invalid user');

	if (
		!Array.isArray(permissions) ||
		!permissions.every(
			(perm) =>
				'module' in perm &&
				Array.isArray(perm.actions) &&
				perm.actions.every((action) => isValidObjectId(action))
		)
	) {
		throw new BadRequestError('Permissions are not in valid format');
	}

	const user = await User.findById(userId);
	if (!user) throw new BadRequestError('User not found');

	for (const perm of permissions) {
		const module = await Module.findById(perm.module);
		if (!module) throw new BadRequestError('Module not found');
		if (!perm.actions.every((action) => module.actions.includes(action)))
			throw new BadRequestError('Action not valid');
	}

	await User.findByIdAndUpdate(userId, { permissions });

	res.status(201).send({ message: 'Success' });
};

const getPermissionsController = async (req: Request, res: Response) => {
	const { userId } = req.params;
	// Validating body
	if (!isValidObjectId(userId)) throw new BadRequestError('Invalid user');

	const user = await User.findById(userId).lean();
	if (!user) throw new BadRequestError('User not found');
	// remove _id property from each entry in the permissions array
	user.permissions.forEach((permission: any) => {
		delete permission._id;
	});
	res.status(200).send(user.permissions);
};

export { authorisationController, getPermissionsController };
