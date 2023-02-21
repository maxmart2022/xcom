export interface VerifyErrors {
	name: string;
	message: string;
}

export interface UserPayload {
	email: string;
	id: string;
	isActive: boolean;
	isSuperUser: boolean;
	role: string;
}
