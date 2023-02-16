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

	const newAction = async (data) => {
		const responseData = await request(
			'post',
			`${API_URL}/new`,
			data,
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
