import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

interface ModuleAttrs {
	name: string;
	actions: [ObjectId];
}

interface ModuleModel extends Model<ModuleDoc> {
	build(attrs: ModuleAttrs): ModuleDoc;
}

interface ModuleDoc extends Document {
	name: string;
	actions: [ObjectId];
}

const moduleSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	actions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Action',
		},
	],
});

moduleSchema.statics.build = (attrs: ModuleAttrs) => {
	return new Module(attrs);
};

const Module = mongoose.model<ModuleDoc, ModuleModel>('Module', moduleSchema);

export { Module };
