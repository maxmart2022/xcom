import express from 'express';
import 'express-async-errors';
import path from 'path';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { NotFoundError, errorHandler } from './errors';
import { currentUser, requireAuth, requireSuperman } from './middlewares';
import {
	authRouter,
	actionRouter,
	tokenRouter,
	moduleRouter,
	authorisationRouter,
	categoryRouter,
	brandRouter,
	variantRouter,
	fileUploadRouter,
} from './routes';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
	cookieSession({
		signed: false,
		secure: true,
	})
);

app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(requireSuperman);

app.use(authRouter);
app.use(tokenRouter);

app.use(currentUser);
app.use(requireAuth);

app.use(actionRouter);
app.use(moduleRouter);
app.use(authorisationRouter);
app.use(categoryRouter);
app.use(brandRouter);
app.use(variantRouter);
app.use(fileUploadRouter);

app.all('*', (req, res) => {
	throw new NotFoundError();
});
app.use(errorHandler);

export { app };
