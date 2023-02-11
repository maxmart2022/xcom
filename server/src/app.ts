import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routes/auth';
import { requireSuperman } from './middlewares/require-superman';
import { actionRouter } from './routes/action';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: true,
	})
);

app.use(requireSuperman);

app.use(authRouter);
app.use(actionRouter);

app.all('*', (req, res) => {
	throw new NotFoundError();
});
app.use(errorHandler);

export { app };
