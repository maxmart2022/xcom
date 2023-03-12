import { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import { BadRequestError } from '../errors';
import {
	Brand,
	Category,
	ChildProduct,
	ParentProduct,
	User,
	Variant,
} from '../models';

const { ObjectId } = mongoose.Types;

const listProductsController = async (req: Request, res: Response) => {
	const products = await ParentProduct.find({}).populate(['ChildProduct']);
	res.status(200).send(products);
};

const newProductController = async (req: Request, res: Response) => {
	const {
		name,
		description,
		categories,
		brand,
		productImages,
		variants,
	}: {
		name: string;
		description: string;
		categories: [ObjectId];
		brand?: string;
		productImages?: [string];
		variants?: [{ name: string; values: [string] }];
	} = req.body;

	// Product name unique validation
	const productName = await ParentProduct.findOne({ name });
	if (productName) throw new BadRequestError('Product name exists');

	if (!Array.isArray(categories))
		throw new BadRequestError('Categories should be an array');
	categories.forEach(async (category) => {
		const categoryExists = await Category.findById(category);
		if (!categoryExists) throw new BadRequestError('Such a category not found');
	});

	if (!(typeof brand === 'undefined' || brand === '')) {
		const brandExists = await Brand.findById(brand);
		if (!brandExists) throw new BadRequestError('Such a brand not found');
	}

	if (!Array.isArray(variants))
		throw new BadRequestError('Variants should be an array');
	variants.forEach(async (variant) => {
		const variantExists = await Variant.findOne({ name: variant.name });
		if (!variantExists) throw new BadRequestError('Such a variant not found');

		if (!Array.isArray(variant.values))
			throw new BadRequestError('Variant values must be in array format');
		const variantValues = variant.values;
		variantValues.forEach((variantValue: string) => {
			if (!variantExists.values.includes(variantValue))
				throw new BadRequestError(`${variantValue} not found`);
		});
	});
	const createdBy = new ObjectId(req.currentUser?.id);
	const user = await User.findById(createdBy);
	if (!user) throw new BadRequestError('Such a user not found');

	const parentProduct = ParentProduct.build({
		name,
		description,
		categories,
		brand,
		images: productImages,
		variants,
		createdBy,
		updatedBy: createdBy,
	});
	await parentProduct.save();
};
