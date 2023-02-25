import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const useApi = () => {
	const axiosPrivate = useAxiosPrivate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	const fetchData = async (url, params) => {
		try {
			setLoading(true);
			const response = await axiosPrivate.get(url, params);
			setLoading(false);
			return response.data;
		} catch (err) {
			setLoading(false);
			if (err.response && err.response.data && err.response.data.errors) {
				setError(err.response.data.errors[0].message);
			} else if (err.response?.status === 401 || err.response?.status === 403) {
				navigate('/login', { state: { from: location }, replace: true });
			} else {
				setError('Something unexpected happened!');
			}
			return null;
		}
	};

	const postData = async (url, data, method = 'POST') => {
		try {
			setLoading(true);
			const response = await axiosPrivate({
				method: method,
				url: url,
				data: data,
			});
			setLoading(false);
			return response.data;
		} catch (err) {
			setLoading(false);
			if (err.response && err.response.data && err.response.data.errors) {
				setError(err.response.data.errors[0].message);
			} else if (err.response?.status === 401 || err.response?.status === 403) {
				navigate('/login', { state: { from: location }, replace: true });
			} else {
				setError('Something unexpected happened!');
			}
			return null;
		}
	};

	const putData = async (url, data) => {
		return postData(url, data, 'PUT');
	};

	const deleteData = async (url, data) => {
		return postData(url, data, 'DELETE');
	};

	return { loading, error, fetchData, postData, putData, deleteData, setError };
};

export default useApi;
