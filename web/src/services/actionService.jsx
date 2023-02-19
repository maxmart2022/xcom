import useApi from 'hooks/use-api';
import authHeader from './authHeader';

const useActionService = () => {
	const API_URL = 'https://maxmart.dev/api/action';

	const { request, loading, error, data } = useApi();

	const getActions = async () => {
		const responseData = await request(
			'get',
			`${API_URL}/list`,
			null,
			authHeader()
		);
		return responseData;
	};

	const newAction = async (payload) => {
		console.log('New Action called');
		const responseData = await request(
			'post',
			`${API_URL}/new`,
			payload,
			authHeader()
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
