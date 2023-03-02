import { Request, Response, NextFunction } from 'express';
import { AccessForbidden, NotAuthorizedError } from '../errors';
import { Action, Module, User } from '../models';

export const hasPermission = (moduleName: string, actionName: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (!req.currentUser) throw new NotAuthorizedError();

		if (req.currentUser.isSuperUser) {
			next();
		} else {
			const moduleExists = await Module.findOne({ name: moduleName });
			if (!moduleExists) throw new AccessForbidden();

			const user = await User.findById(req.currentUser.id).populate({
				path: 'permissions.module',
				match: { name: moduleName },
				select: '_id',
			});

			if (!user) throw new AccessForbidden();

			const module = user.permissions.find((perm) => perm.module !== null);

			if (!module) throw new AccessForbidden();

			const action = await Action.findOne({ name: actionName });
			if (!action) throw new AccessForbidden();

			const hasPermission = module.actions.includes(action._id.toString());

			if (!hasPermission) throw new AccessForbidden();

			next();
		}
	};
};
