import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AccessForbidden, NotAuthorizedError } from '../errors';
import { User } from '../models';
import { UserPayload } from '../types/types';

const refreshTokenController = async (req: Request, res: Response) => {
	try {
		// Get the JWT from the cookies
		const refreshToken = req.cookies.jwt;
		if (!refreshToken) {
			throw new NotAuthorizedError();
		}

		// Check if the JWT is valid and extract the user's email
		let email;
		try {
			const decoded = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN!
			) as UserPayload;
			email = decoded.email;
		} catch (err) {
			throw new AccessForbidden();
		}

		// Find the user associated with the refresh token
		const user = await User.findOne({ email, refreshToken }).exec();
		if (!user) {
			throw new NotAuthorizedError();
		}

		// Generate a new access token and refresh token
		const accessToken = User.generateAuthToken(
			user,
			process.env.JWT_KEY!,
			15 * 60
		);
		const newRefreshToken = User.generateAuthToken(
			user,
			process.env.REFRESH_TOKEN!,
			24 * 60 * 60
		);

		// Update the user's refresh token in the database
		user.refreshToken.push(newRefreshToken);
		await user.save();

		// Set the new refresh token as a cookie
		res.cookie('jwt', newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 24 * 60 * 60 * 1000,
		});

		// Send the new access token and its expiration time as a response
		const expiresAt = Math.floor(Date.now() / 1000 + 15 * 60);
		res.status(201).send({ access_token: accessToken, expiresAt });
	} catch (err) {
		if (err instanceof NotAuthorizedError || err instanceof AccessForbidden) {
			res.clearCookie('jwt', {
				httpOnly: true,
				sameSite: 'none',
				secure: true,
			});
			res.status(err.statusCode).send({ errors: err.serializeErrors() });
		} else {
			console.error(err);
			res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
		}
	}
};

export { refreshTokenController };
