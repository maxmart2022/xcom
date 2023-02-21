import useApi from 'hooks/useApi';
import useAuthHeader from './authHeader';

const useActionService = () => {
	const API_URL = 'https://maxmart.dev/api/action';
	const headers = useAuthHeader();

	const { request, loading, error, data } = useApi();

	const getActions = async () => {
		const responseData = await request('get', `${API_URL}/list`, null, headers);
		return responseData;
	};

	const newAction = async (payload) => {
		const responseData = await request(
			'post',
			`${API_URL}/new`,
			payload,
			headers
		);
		return responseData;
	};

	return {
		getActions,
		newAction,
		loading,
		error,
		data,
	};
};

export default useActionService;
