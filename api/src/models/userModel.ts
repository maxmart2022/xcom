import mongoose, { Document, Model, ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
import { roles } from '../constants/roles';
import { Password } from '../services/password';

interface UserAttrs {
	email: string;
	password: string;
}

interface TokenAttrs {
	_id?: ObjectId;
	email: string;
	isSuperUser: boolean;
	isActive: boolean;
	role: string;
	permissions: [{ module: ObjectId; actions: [ObjectId] }];
}

interface UserModel extends Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
	generateAuthToken(user: TokenAttrs, secret: string, expiry: number): string;
}

interface UserDoc extends Document {
	email: string;
	password: string;
	role: roles;
	isSuperUser: boolean;
	isActive: boolean;
	permissions: [{ module: ObjectId; actions: [ObjectId] }];
	refreshToken: string[];
	refreshTokenVersion: number;
}

const userSchema = new mongoose.Schema(
	{
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		role: {
			type: String,
			required: true,
			enum: [...Object.values(roles), process.env.SUPERADMIN_ROLE!],
			default: roles.GUEST,
		},
		isActive: { type: Boolean, default: true },
		isSuperUser: { type: Boolean, default: false },
		permissions: [
			{
				module: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Module',
				},
				actions: [
					{
						type: mongoose.Schema.Types.ObjectId,
						ref: 'Action',
					},
				],
			},
		],
		refreshToken: [String],
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.password;
				delete ret.__v;
			},
		},
	}
);

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.hashPassword(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

userSchema.statics.generateAuthToken = (user: TokenAttrs, secret, expiry) => {
	return jwt.sign(
		{
			id: user._id,
			email: user.email,
			isSuperUser: user.isSuperUser,
			isActive: user.isActive,
			role: user.role,
			scope: user.permissions,
			exp: Math.floor(Date.now() / 1000 + expiry),
		},
		secret
	);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

async function createSuperUserIfNotExists() {
	const superUser = await User.findOne({
		email: process.env.SUPERADMIN_EMAIL!,
		isSuperUser: true,
	});
	if (!superUser) {
		const newUser = new User({
			email: process.env.SUPERADMIN_EMAIL!,
			password: process.env.SUPERADMIN_PASSWORD!,
			role: process.env.SUPERADMIN_ROLE!,
			isSuperUser: true,
		});
		newUser.save();
		console.log('Super user created successfully!');
	} else {
		console.log('Super user exists');
	}
}

async function findSuperman() {
	const superUser = await User.findOne({
		email: process.env.SUPERADMIN_EMAIL!,
		isSuperUser: true,
	});
	return !superUser ? false : true;
}

export { User, createSuperUserIfNotExists, findSuperman };
