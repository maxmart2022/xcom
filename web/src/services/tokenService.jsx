import useApi from 'hooks/useApi';
import { useContext } from 'react';
import AuthContext from 'state/AuthProvider';

const useTokenService = () => {
	const { auth } = useContext(AuthContext);
	console.log(auth);
	const API_URL = 'https://maxmart.dev/api/token';

	const { request, loading, error, data } = useApi();

	const refreshToken = async () => {
		const headers = {
			'x-refresh-token': `Bearer ${auth.refreshToken}`,
		};
		const responseData = await request(
			'post',
			`${API_URL}/refresh`,
			null,
			headers
		);
		return responseData;
	};

	return { refreshToken, loading, error, data };
};

export default useTokenService;
