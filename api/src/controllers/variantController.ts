import { Request, Response } from 'express';
import mongoose, { isValidObjectId, ObjectId } from 'mongoose';
import { NotAuthorizedError } from '../errors';
import { BadRequestError } from '../errors/badRequestError';
import { Category, User, Variant } from '../models/';

const { ObjectId } = mongoose.Types;

const listVariantsController = async (req: Request, res: Response) => {
	const variants = await Variant.find({}).populate(['categories']);
	res.status(200).send(variants);
};

const newVariantController = async (req: Request, res: Response) => {
	const { name, categories }: { name: string; categories: [ObjectId] } =
		req.body;
	let { values } = req.body;

	// Variant name unique validation
	const nameExists = await Variant.findOne({ name });
	if (nameExists) throw new BadRequestError('Variant name found');

	// Variant values validation
	if (!Array.isArray(values))
		throw new BadRequestError('Values & Cateogries should be in array format');
	if (values.length > 0) {
		values = [...new Set(values)];
	} else {
		throw new BadRequestError('Values must have at least one entry');
	}

	// Category validation
	if (typeof categories !== 'undefined' && categories.length > 0) {
		if (!Array.isArray(categories))
			throw new BadRequestError(
				'Values & Cateogries should be in array format'
			);
		categories.forEach(async (category) => {
			if (!isValidObjectId(category))
				throw new BadRequestError('Invalid Category');
			const categoryExists = await Category.findById(category);
			if (!categoryExists)
				throw new BadRequestError('Such a category not found');
		});
	}

	const createdBy = new ObjectId(req.currentUser?.id);
	const user = await User.findById(createdBy);
	if (!user) throw new BadRequestError('Such a user not found');

	const variant = Variant.build({ name, values, categories });
	variant.createdBy = createdBy;
	variant.lastUpdatedBy = createdBy;
	await variant.save();

	res.status(201).send(variant);
};

const viewVariantController = async (req: Request, res: Response) => {
	const variantId = req.params.id;
	if (!isValidObjectId(variantId))
		throw new BadRequestError('Invalid variant id');

	const variant = await Variant.findById(variantId).populate(['categories']);
	if (!variant) throw new BadRequestError('Variant not found');

	res.status(200).send(variant);
};

const updateVariantController = async (req: Request, res: Response) => {
	const variantId = req.params.id;
	if (!isValidObjectId(variantId))
		throw new BadRequestError('Invalid variant id');

	const variant = await Variant.findById(variantId);
	if (!variant) throw new BadRequestError('Variant not found');

	const { name, categories }: { name: string; categories: [ObjectId] } =
		req.body;
	let { values } = req.body;

	const nameExists = await Variant.findOne({ name, _id: { $ne: variantId } });
	if (nameExists) throw new BadRequestError('Variant name exists');

	// Variant values validation
	if (!Array.isArray(values))
		throw new BadRequestError('Values & Cateogries should be in array format');
	if (values.length > 0) {
		values = [...new Set(values)];
	} else {
		throw new BadRequestError('Values must have at least one entry');
	}

	// Category validation
	if (typeof categories !== 'undefined' && categories.length > 0) {
		if (!Array.isArray(categories))
			throw new BadRequestError(
				'Values & Cateogries should be in array format'
			);
		categories.forEach(async (category) => {
			if (!isValidObjectId(category))
				throw new BadRequestError('Invalid Category');
			const categoryExists = await Category.findById(category);
			if (!categoryExists)
				throw new BadRequestError('Such a category not found');
		});
	}

	const lastUpdatedBy = new ObjectId(req.currentUser?.id);
	const user = await User.findById(lastUpdatedBy);
	if (!user) throw new BadRequestError('Such a user not found');

	const variantUpdated = await Variant.findByIdAndUpdate(
		variantId,
		{
			name,
			values,
			categories,
			lastUpdatedBy,
		},
		{ new: true }
	);
	res.status(200).send(variantUpdated);
};

const deleteVariantController = async (req: Request, res: Response) => {
	const variantId = req.params.id;
	if (!isValidObjectId(variantId))
		throw new BadRequestError('Invalid variant id');

	const variant = await Variant.findById(variantId);
	if (!variant) throw new BadRequestError('Variant not found');

	await Variant.findByIdAndDelete(variantId);
	res.status(200).send(variant);
};

export {
	listVariantsController,
	newVariantController,
	viewVariantController,
	updateVariantController,
	deleteVariantController,
};
