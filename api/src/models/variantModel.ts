import mongoose, { ObjectId } from 'mongoose';

interface VariantAttrs {
	name: string;
	values: [string];
	categories: [ObjectId];
}

interface VariantModel extends mongoose.Model<VariantDoc> {
	build(attrs: VariantAttrs): VariantDoc;
}

interface VariantDoc extends mongoose.Document {
	name: string;
	values: [string];
	categories: [ObjectId];
	createdBy: mongoose.Types.ObjectId;
	lastUpdatedBy: mongoose.Types.ObjectId;
}

interface VariantSchema extends mongoose.Schema {
	currentUser?: string;
}

const variantSchema: VariantSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		values: [
			{
				type: String,
				required: true,
			},
		],
		categories: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Category',
			},
		],
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

variantSchema.statics.build = (attrs: VariantAttrs) => {
	return new Variant(attrs);
};

const Variant = mongoose.model<VariantDoc, VariantModel>(
	'Variant',
	variantSchema
);

export { Variant };
