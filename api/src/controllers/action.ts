import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { BadRequestError } from '../errors/bad-request-error';
import { Action } from '../models/action';

const listActions = async (req: Request, res: Response) => {
	const actions = await Action.find({});
	res.status(200).send(actions);
};

const newAction = async (req: Request, res: Response) => {
	const { name } = req.body;
	const nameExists = await Action.findOne({ name });
	if (nameExists) throw new BadRequestError('Action exists');

	const action = Action.build({ name });
	await action.save();

	res.status(200).send(action);
};

const viewAction = async (req: Request, res: Response) => {
	const actionId = req.params.id;
	if (!isValidObjectId(actionId))
		throw new BadRequestError('Invalid action id');

	const action = await Action.findById(actionId);
	if (!action) throw new BadRequestError('Action not found');

	res.status(200).send(action);
};

const updateAction = async (req: Request, res: Response) => {
	const actionId = req.params.id;
	if (!isValidObjectId(actionId))
		throw new BadRequestError('Invalid action id');

	const action = await Action.findById(actionId);
	if (!action) throw new BadRequestError('Action not found');

	const { name } = req.body;
	action.set({ name });
	await action.save();

	res.status(201).send(action);
};

export { listActions, newAction, viewAction, updateAction };
