import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { BadRequestError } from '../errors';
import { Action, Module } from '../models';

const listModulesController = async (req: Request, res: Response) => {
	const modules = await Module.find({}).populate('actions');
	res.status(200).send(modules);
};

const newModuleController = async (req: Request, res: Response) => {
	const { name, actions } = req.body;
	const nameExists = await Module.findOne({ name });
	if (nameExists) throw new BadRequestError('Module name found');

	for (let actionValue of actions) {
		if (!isValidObjectId(actionValue))
			throw new BadRequestError('Invalid action');

		const actionExists = await Action.findById(actionValue);
		if (!actionExists) throw new BadRequestError('Such an action not found');
	}

	const module = Module.build({ name, actions });
	await module.save();

	res.status(200).send(module);
};

const viewModuleController = async (req: Request, res: Response) => {
	const moduleId = req.params.id;
	if (!isValidObjectId(moduleId))
		throw new BadRequestError('Invalid module Id');

	const module = await Module.findById(moduleId);
	if (!module) throw new BadRequestError('Module not found');

	res.status(200).send(module);
};

const updateModuleController = async (req: Request, res: Response) => {
	const moduleId = req.params.id;
	if (!isValidObjectId(moduleId))
		throw new BadRequestError('Invalid module id');

	const { name, actions } = req.body;

	const module = await Module.findById(moduleId);
	if (!module) throw new BadRequestError('Module not found');

	module.set({ name, actions });
	await module.save();

	res.status(201).send(module);
};

const deleteModuleController = async (req: Request, res: Response) => {
	const moduleId = req.params.id;
	if (!isValidObjectId(moduleId))
		throw new BadRequestError('Invalid module id');

	const module = await Module.findByIdAndDelete(moduleId);
	res.status(200).send(module);
};

export {
	listModulesController,
	newModuleController,
	viewModuleController,
	updateModuleController,
	deleteModuleController,
};
