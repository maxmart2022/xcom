import bcrypt from 'bcrypt';

const saltRounds = 10;

export class Password {
	static async hashPassword(password: string) {
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}

	static async comparePasswords(password: string, hash: string) {
		const match = await bcrypt.compare(password, hash);
		return match;
	}
}
