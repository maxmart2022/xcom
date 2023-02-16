import useApi from 'hooks/use-api';

const useTokenService = () => {
	const API_URL = 'https://maxmart.dev/api/token';

	const { request, loading, error, data } = useApi();

	const refreshToken = async () => {
		const headers = {
			'x-refresh-token': `Bearer ${localStorage.getItem('refreshToken')}`,
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
