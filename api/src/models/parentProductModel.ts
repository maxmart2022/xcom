import mongoose, { ObjectId } from 'mongoose';

interface ParentProductAttrs {
	name: string;
	description: string;
	categories: [ObjectId];
	brand?: string;
	images?: [String];
	variants?: [{ name: string; values: [string] }];
	createdBy: mongoose.Types.ObjectId;
	updatedBy: mongoose.Types.ObjectId;
}

interface ParentProductModel extends mongoose.Model<ParentProductDoc> {
	build(attrs: ParentProductAttrs): ParentProductDoc;
}

interface ParentProductDoc extends mongoose.Document {
	name: string;
	description: string;
	categories: [ObjectId];
	brand?: string;
	images?: [String];
	variants?: [{ name: string; values: [string] }];
	childProducts: [ObjectId];
	createdBy: mongoose.Types.ObjectId;
	updatedBy: mongoose.Types.ObjectId;
}

const parentProductSchema = new mongoose.Schema(
	{
		name: String,
		description: String,
		categories: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
		brand: { type: mongoose.Types.ObjectId, ref: 'Brand' },
		images: [String],
		variants: [
			{
				name: {
					type: String,
					required: true,
					unique: true,
				},
				values: [{ type: String, required: true }],
			},
		],
		childProducts: [{ type: mongoose.Types.ObjectId, ref: 'ChildProduct' }],
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		updatedBy: {
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

parentProductSchema.statics.build = (attrs: ParentProductAttrs) => {
	return new ParentProduct(attrs);
};

const ParentProduct = mongoose.model<ParentProductDoc, ParentProductModel>(
	'ParentProduct',
	parentProductSchema
);

export { ParentProduct };
