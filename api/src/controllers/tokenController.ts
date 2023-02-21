import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AccessForbidden, NotAuthorizedError } from '../errors';
import { User } from '../models';
import { UserPayload } from '../types/types';

const refreshTokenController = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

	const user = await User.findOne({ refreshToken }).exec();

	if (!user) {
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN!,
			(err: jwt.VerifyErrors | null, decoded: any) => {
				if (err) throw new AccessForbidden();
				const { email } = decoded as UserPayload;
				User.findOneAndUpdate(
					{ email },
					{ $set: { refreshToken: [] } },
					{ new: true },
					(err, updatedUser) => {
						if (err || !updatedUser) throw new NotAuthorizedError();
					}
				);
			}
		);

		throw new AccessForbidden();
	}

	const newRefreshTokenArray = user.refreshToken.filter(
		(rt) => rt !== refreshToken
	);

	// evaluate jwt
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN!,
		async (err: jwt.VerifyErrors | null, decoded: any) => {
			if (err) {
				user.refreshToken = [...newRefreshTokenArray];
				await user.save();
			}
			if (err || user.email !== decoded.email) return res.sendStatus(403);
			const access_token = jwt.sign(decoded, process.env.JWT_KEY!, {
				expiresIn: '300s',
			});
			const newRefreshToken = jwt.sign(decoded, process.env.REFRESH_TOKEN!, {
				expiresIn: '1d',
			});
			user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
			await user.save();

			res.cookie('jwt', newRefreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'none',
				maxAge: 24 * 60 * 60 * 1000,
			});

			const expiresAt = Math.floor(Date.now() / 1000 + 5 * 60);
			res.status(201).send({ access_token, expiresAt });
		}
	);
};

export { refreshTokenController };
