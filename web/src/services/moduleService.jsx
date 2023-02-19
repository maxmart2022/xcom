import useApi from 'hooks/use-api';
import authHeader from './authHeader';

const useModuleService = () => {
	const API_URL = 'https://maxmart.dev/api/module';

	const { request, loading, error, data } = useApi();

	const getModules = async () => {
		const responseData = await request(
			'get',
			`${API_URL}/list`,
			null,
			authHeader()
		);
		return responseData;
	};

	const newModule = async (payload) => {
		const responseData = await request(
			'post',
			`${API_URL}/new`,
			payload,
			authHeader()
		);
		return responseData;
	};

	return {
		getModules,
		newModule,
		loading,
		error,
		data,
	};
};

export default useModuleService;
