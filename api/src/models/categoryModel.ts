import mongoose from 'mongoose';

interface categoryAttrs {
	name: string;
	parent?: [mongoose.Types.ObjectId];
	createdBy: mongoose.Types.ObjectId;
}

interface CategoryModel extends mongoose.Model<CategoryDoc> {
	build(attrs: categoryAttrs): CategoryDoc;
}

interface CategoryDoc extends mongoose.Document {
	name: string;
	parent: [mongoose.Types.ObjectId];
	child: [mongoose.Types.ObjectId];
	createdBy: mongoose.Types.ObjectId;
	lastUpdatedBy: mongoose.Types.ObjectId;
}

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		parent: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Category',
			},
		],
		child: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Category',
			},
		],
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		lastUpdatedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

categorySchema.statics.build = (attrs: categoryAttrs) => {
	return new Category(attrs);
};

const Category = mongoose.model<CategoryDoc, CategoryModel>(
	'Category',
	categorySchema
);

async function buildSubCategory(category: CategoryDoc) {
	for (const parentCateg of category.parent) {
		const parentCategory = await Category.findById(parentCateg, 'child').exec();
		if (parentCategory) {
			const { id } = category; // Name and id of the category just inserted
			let child = [...parentCategory.child];
			if (!parentCategory.child.includes(new mongoose.Types.ObjectId(id))) {
				child = [...parentCategory.child, new mongoose.Types.ObjectId(id)]; // Fetching the existing children from the parent category
			}
			await Category.findByIdAndUpdate(parentCategory.id, { $set: { child } }); // Updating the parent category
		}
	}
}

export { Category, buildSubCategory };
