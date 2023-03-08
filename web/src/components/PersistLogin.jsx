import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import useRefreshToken from 'hooks/useRefreshToken';
import useAuth from 'hooks/useAuth';
import useLocalStorage from 'hooks/useLocalStorage';

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth } = useAuth();
	const [persist] = useLocalStorage('persist', false);

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		!auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

		return () => {
			isMounted = false;
		};
	}, [auth?.accessToken, persist]);

	return (
		<>
			{!persist ? (
				<Outlet />
			) : isLoading ? (
				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={true}
				>
					<CircularProgress color='inherit' />
				</Backdrop>
			) : (
				<Outlet />
			)}
		</>
	);
};

export default PersistLogin;
