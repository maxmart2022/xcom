import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { BadRequestError } from '../errors/badRequestError';
import { Action } from '../models/actionModel';

const listActionsController = async (req: Request, res: Response) => {
	const actions = await Action.find({});
	res.status(200).send(actions);
};

const newActionController = async (req: Request, res: Response) => {
	const { name } = req.body;
	const nameExists = await Action.findOne({ name });
	if (nameExists) throw new BadRequestError('Action exists');

	const action = Action.build({ name });
	await action.save();

	res.status(200).send(action);
};

const viewActionController = async (req: Request, res: Response) => {
	const actionId = req.params.id;
	if (!isValidObjectId(actionId))
		throw new BadRequestError('Invalid action id');

	const action = await Action.findById(actionId);
	if (!action) throw new BadRequestError('Action not found');

	res.status(200).send(action);
};

const updateActionController = async (req: Request, res: Response) => {
	const actionId = req.params.id;
	if (!isValidObjectId(actionId))
		throw new BadRequestError('Invalid action id');

	const action = await Action.findById(actionId);
	if (!action) throw new BadRequestError('Action not found');

	const { name } = req.body;
	const nameExists = await Action.findOne({ name, _id: { $ne: actionId } });
	if (nameExists) throw new BadRequestError('Action exists');
	action.set({ name });
	await action.save();

	res.status(201).send(action);
};

export {
	listActionsController,
	newActionController,
	viewActionController,
	updateActionController,
};
