import React, { createContext, useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				const { data } = await axiosPrivate.get('auth/currentUser');
				if (data && data.currentUser && data.currentUser !== 'null') {
					setCurrentUser(data.currentUser);
				}
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		getCurrentUser();
	}, []);
	return (
		<UserContext.Provider value={currentUser}>
			{loading ? (
				<Skeleton sx={{ height: 190 }} animation='wave' variant='rectangular' />
			) : (
				<React.Fragment>{children}</React.Fragment>
			)}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
