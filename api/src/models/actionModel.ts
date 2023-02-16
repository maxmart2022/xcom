import mongoose, { Document, Model, Schema } from 'mongoose';

interface ActionAttrs {
	name: string;
}

interface ActionModel extends Model<ActionDoc> {
	build(attrs: ActionAttrs): ActionDoc;
}

interface ActionDoc extends Document {
	name: string;
}

const actionSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

actionSchema.statics.build = (attrs: ActionAttrs) => {
	return new Action(attrs);
};
const Action = mongoose.model<ActionDoc, ActionModel>('Action', actionSchema);

export { Action };
