import axios from 'api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const { data } = await axios.post('token/refresh', {
			withCredentials: true,
		});
		setAuth((prev) => {
			return {
				...prev,
				accessToken: data?.access_token,
			};
		});
		return data?.access_token;
	};
	return refresh;
};

export default useRefreshToken;
