import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { NotFoundError, errorHandler } from './errors';
import { currentUser, requireSuperman } from './middlewares';
import { authRouter, actionRouter, tokenRouter, moduleRouter } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: true,
	})
);

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(cookieParser());

app.use(requireSuperman);

app.use(authRouter);
app.use(tokenRouter);

app.use(currentUser);

app.use(actionRouter);
app.use(moduleRouter);

app.all('*', (req, res) => {
	throw new NotFoundError();
});
app.use(errorHandler);

export { app };
