import { useContext } from 'react';
import AuthContext from 'state/AuthProvider';

const useAuthHeader = () => {
	const { auth } = useContext(AuthContext);
	const headers = auth?.accessToken
		? { 'x-access-token': `Bearer ${auth.accessToken}` }
		: {};
	return headers;
};

export default useAuthHeader;
