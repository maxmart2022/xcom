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
	const { name, parent, brandOwner } = req.body;

	const brandExists = await Brand.findOne({ name });
	if (brandExists) throw new BadRequestError('Brand exists !!!');

	if (typeof parent !== 'undefined' && !ObjectId.isValid(parent)) {
		throw new BadRequestError('Parent brand not found');
	}
	const parentBrand = await Brand.findById(parent);
	if (!parentBrand) throw new BadRequestError("Parent Brand doesn't exist");

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
	const { name, parent, brandOwner } = req.body;

	// Check the id passed is valid or not
	if (!ObjectId.isValid(brandId)) throw new BadRequestError('Brand not found');

	const brand = await Brand.findById(brandId);
	if (!brand) throw new NotFoundError();

	// Brand name unique validation, brand where name=name and id!=givenId
	const brandExists = await Brand.findOne({
		name,
		brandOwner,
		_id: { $ne: brandId },
	});
	if (brandExists) throw new BadRequestError('Brand exists !!!');

	if (typeof parent != 'undefined') {
		if (!ObjectId.isValid(parent))
			throw new BadRequestError('Parent brand is invalid');
		const parentBrand = await Brand.findById(parent);
		if (!parentBrand)
			throw new BadRequestError(`Parent Brand, ${parent} doesn't exist`);
	}

	// only name changes
	if (
		brand.name !== name &&
		brand.parent.equals(new mongoose.Types.ObjectId(parent))
	) {
		brand.set({ name, parent });
		await brand.save();
	} else {
		// Removing the child from the current parent if alreay have a parent
		if (brand.parent !== null) {
			const currentParentBrand = await Brand.findById(brand.parent);
			if (!currentParentBrand)
				throw new BadRequestError(
					`Parent Brand, ${brand.parent} removed but not in parent`
				);

			const filteredChild = brand.child.filter((brandChild) => {
				return !brandChild.equals(new mongoose.Types.ObjectId(brandId));
			}); // Filtering the current child array with the current brand ID
			console.log(filteredChild);
			await Brand.findByIdAndUpdate(brand.parent, {
				$set: { child: filteredChild },
			});
		}
		// Update with new inputs
		brand.set({ name, parent, brandOwner });
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

	const parent = await Brand.findById(brandParent);
	if (!parent) throw new BadRequestError('Parent in this brand not found');

	await Brand.findByIdAndUpdate(brandParent, {
		$set: { child: new ObjectId(brandId) },
	});

	// Updating parent in child

	if (brandChild.length > 0) {
		for (const childId of brandChild) {
			const childBrand = await Brand.findById(childId);
			if (!childBrand) throw new BadRequestError('Child not found');

			await Brand.findByIdAndUpdate(childId, {
				$set: { parent: new ObjectId(brandId) },
			});
		}
	}

	await Brand.deleteMany({ _id: new ObjectId(brandId) });

	res.status(200).send(brand);
};

export {
	listBrandController,
	viewBrandController,
	newBrandController,
	updateBrandController,
	deleteBrandController,
};
