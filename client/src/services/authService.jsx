import useApi from 'hooks/use-api';

const useAuthService = () => {
	const API_URL = 'https://maxmart.dev/api/auth';

	const { request, loading, error, data } = useApi();

	const getUsers = async () => {
		const responseData = await request('get', `${API_URL}/users`);
		return responseData;
	};

	const login = async (data) => {
		const responseData = await request('post', `${API_URL}/signin`, data);
		return responseData;
	};

	const signup = async (data) => {
		const responseData = await request('post', `${API_URL}/signup`, data);
		return responseData;
	};

	return {
		getUsers,
		login,
		signup,
		loading,
		error,
		data,
	};
};

export default useAuthService;
