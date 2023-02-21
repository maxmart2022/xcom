import useApi from 'hooks/useApi';
import useAuthHeader from './authHeader';

const useModuleService = () => {
	const API_URL = 'https://maxmart.dev/api/module';
	const headers = useAuthHeader();

	const { request, loading, error, data } = useApi();

	const getModules = async () => {
		const responseData = await request('get', `${API_URL}/list`, null, headers);
		return responseData;
	};

	const newModule = async (payload) => {
		const responseData = await request(
			'post',
			`${API_URL}/new`,
			payload,
			headers
		);
		return responseData;
	};

	const updateModule = async (moduleId, payload) => {
		const responseData = await request(
			'put',
			`${API_URL}/update/${moduleId}`,
			payload,
			headers
		);
		return responseData;
	};

	return {
		getModules,
		newModule,
		updateModule,
		loading,
		error,
		data,
	};
};

export default useModuleService;
