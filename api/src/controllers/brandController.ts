import { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import { BadRequestError, NotFoundError } from '../errors';
import { buildSubBrand, Brand } from '../models';
import { User } from '../models';

const { ObjectId } = mongoose.Types;

// Get All
const listBrandController = async (req: Request, res: Response) => {
	const brand = await Brand.find({}).populate(['parent', 'child']);
	return res.status(200).send(brand);
};

// get by Id
const viewBrandController = async (req: Request, res: Response) => {
	const { id } = req.params;
	const brand = await Brand.findById(id).populate(['parent', 'child']);
	return res.status(200).send(brand);
};

// Create
const newBrandController = async (req: Request, res: Response) => {
	const { name, brandOwner } = req.body;
	let { parent } = req.body;

	const brandExists = await Brand.findOne({ name });
	if (brandExists) throw new BadRequestError('Brand exists !!!');

	if (parent !== '') {
		if (!ObjectId.isValid(parent)) {
			throw new BadRequestError('Invalid parent');
		} else {
			const parentBrand = await Brand.findById(parent);
			if (!parentBrand) throw new BadRequestError("Parent Brand doesn't exist");
		}
	} else {
		parent = null;
	}

	const createdBy = new ObjectId(req.currentUser?.id);
	const user = await User.findById(createdBy);
	if (!user) throw new BadRequestError('Such a user not found');

	const brand = Brand.build({ name, parent, brandOwner, createdBy });
	await brand.save();

	// Creating sub-brand
	if (brand.parent !== null) {
		buildSubBrand(brand);
	}

	res.status(201).send(brand);
};

// Update
const updateBrandController = async (req: Request, res: Response) => {
	const brandId = req.params.id;
	const { name, brandOwner } = req.body;
	let { parent } = req.body;

	// Check the id passed is valid or not
	if (!ObjectId.isValid(brandId)) throw new NotFoundError();

	// Fetch the brand with the given id
	const brand = await Brand.findById(brandId);
	if (!brand) throw new NotFoundError();

	// brand name unique validation, brand where name=name and id!=givenId
	const brandExists = await Brand.findOne({
		name,
		_id: { $ne: brandId },
	});
	if (brandExists) throw new BadRequestError('Brand exists !!!');

	if (parent !== '' && typeof parent !== 'undefined') {
		if (!ObjectId.isValid(parent)) {
			throw new BadRequestError('Invalid parent');
		} else {
			const parentBrand = await Brand.findById(parent);
			if (!parentBrand) throw new BadRequestError("Parent Brand doesn't exist");
		}
	} else {
		parent = null;
	}

	const updatedBy = new ObjectId(req.currentUser?.id);
	const user = await User.findById(updatedBy);
	if (!user) throw new BadRequestError('Such a user not found');

	if (brand.name !== name && brand.parent === parent) {
		brand.set({ name, parent, brandOwner, lastUpdatedBy: updatedBy });
		await brand.save();
	} else {
		// Removing the child from the current parent if alreay have a parent
		if (brand.parent !== null) {
			const currentParentBrand = await Brand.findById(brand.parent);
			if (!currentParentBrand)
				throw new BadRequestError(
					`Parent Brand, ${brand.parent} removed but not in its child`
				);

			const filteredChild = currentParentBrand.child.filter((brandChild) => {
				return !brandChild.equals(new mongoose.Types.ObjectId(brandId));
			}); // Filtering the current child array with the current brand ID
			await Brand.findByIdAndUpdate(brand.parent, {
				$set: { child: filteredChild },
			});
		}
		// Update with new inputs
		brand.set({ name, parent, brandOwner, lastUpdatedBy: updatedBy });
		await brand.save();
		// Updating child in parent brand
		if (brand.parent !== null) {
			buildSubBrand(brand);
		}
	}

	res.status(201).send(brand);
};

// Delete

const deleteBrandController = async (req: Request, res: Response) => {
	const brandId = req.params.id;

	if (!ObjectId.isValid(brandId)) throw new BadRequestError('Invalid brand');

	const brand = await Brand.findById(brandId);
	if (!brand) throw new BadRequestError('Brand of this id does not exists');

	const brandParent = brand.parent;
	const brandChild = brand.child;
	// Updating child in the parent brand
	if (brandParent !== null) {
		const parent = await Brand.findById(brandParent);
		if (!parent) throw new BadRequestError('Parent in this brand not found');

		await Brand.findByIdAndUpdate(brandParent, {
			$set: { child: new ObjectId(brandId) },
		});
	}

	// Updating parent in child

	if (brandChild.length > 0) {
		for (const childId of brandChild) {
			const childBrand = await Brand.findById(childId);
			if (!childBrand) throw new BadRequestError('Child not found');

			await Brand.findByIdAndUpdate(childId, {
				$set: { parent: null },
			});
		}
	}

	await Brand.deleteMany({ _id: new ObjectId(brandId) });

	res.status(200).send(brand);
};

// const deleteBrands = async (req: Request, res: Response) => {
// 	const brands = await Brand.deleteMany({});
// 	res.status(200).send(brands);
// };

export {
	listBrandController,
	viewBrandController,
	newBrandController,
	updateBrandController,
	deleteBrandController,
};
