import mongoose from 'mongoose';

interface ChildProductAttrs {
	parentProduct: mongoose.Types.ObjectId;
	barcode: string;
	sku: string;
	images: [string];
	createdBy: mongoose.Types.ObjectId;
	updatedBy: mongoose.Types.ObjectId;
}

interface ChildProductModel extends mongoose.Model<ChildProductDoc> {
	build(attrs: ChildProductAttrs): ChildProductDoc;
}

interface ChildProductDoc extends mongoose.Document {
	parentProduct: mongoose.Types.ObjectId;
	barcode: string;
	sku: string;
	images: [string];
	createdBy: mongoose.Types.ObjectId;
	updatedBy: mongoose.Types.ObjectId;
}
const childProductSchema = new mongoose.Schema(
	{
		parentProduct: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ParentProduct',
		},
		barcode: String,
		sku: String,
		images: [String],
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

childProductSchema.statics.build = (attrs: ChildProductAttrs) => {
	return new ChildProduct(attrs);
};

const ChildProduct = mongoose.model<ChildProductDoc, ChildProductModel>(
	'ChildProduct',
	childProductSchema
);

export { ChildProduct };
