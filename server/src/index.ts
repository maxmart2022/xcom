import mongoose from 'mongoose';
import { app } from './app';
import { createSuperUserIfNotExists } from './models/user';

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('jwt must be defined');
	}
	if (!process.env.MONGO_URI) {
		throw new Error('Mongo URL must be defined');
	}
	if (
		!process.env.SUPERADMIN_EMAIL ||
		!process.env.SUPERADMIN_PASSWORD ||
		!process.env.SUPERADMIN_ROLE
	) {
		throw new Error('Please Define Super User Credentials');
	}
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(process.env.MONGO_URI);
		createSuperUserIfNotExists();
		app.listen(3000, () => {
			console.log('Listening to port 3000: Maxmart');
		});
	} catch (err) {
		console.error(err);
	}
};

start();
