import { useState } from 'react';
import axios from 'axios';

const useApi = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const request = async (method, url, payload, headers = {}) => {
		try {
			setLoading(true);
			setError(null);
			setData(null);
			const response = await axios.request({
				method,
				url,
				data: payload,
				headers,
			});
			setData(response.data);
			return response.data;
		} catch (err) {
			console.log(err);
			if (err.response && err.response.data && err.response.data.errors) {
				setError(err.response.data.errors[0].message);
			} else {
				setError(err);
			}
		}
		setLoading(false);
	};

	return {
		request,
		loading,
		error,
		data,
	};
};

export default useApi;
