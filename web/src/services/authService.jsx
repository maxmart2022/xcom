import useApi from 'hooks/useApi';
import useAuthHeader from './authHeader';

const useAuthService = () => {
	const headers = useAuthHeader();

	const { request, loading, error, data } = useApi();

	const getUsers = async () => {
		const responseData = await request('get', 'auth/users');
		return responseData;
	};

	const login = async (data) => {
		const responseData = await request('post', 'auth/signin', data);
		return responseData;
	};

	const signup = async (data) => {
		const responseData = await request('post', 'auth/signup', data);
		return responseData;
	};

	const getLoggedinUser = async () => {
		const responseData = await request(
			'get',
			'auth/currentUser',
			null,
			headers
		);
		return responseData;
	};

	return {
		getUsers,
		login,
		signup,
		getLoggedinUser,
		loading,
		error,
		data,
	};
};

export default useAuthService;
