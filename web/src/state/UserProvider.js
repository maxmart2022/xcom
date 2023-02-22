import React, { createContext, useEffect, useState } from 'react';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getCurrentUser = async () => {
			try {
				const { data } = await axiosPrivate.get('auth/currentUser', {
					signal: controller.signal,
				});
				if (data && data.currentUser && data.currentUser !== 'null') {
					setCurrentUser(data.currentUser);
				}
			} catch (err) {
				console.error(err);
			}
		};
		getCurrentUser();
		// eslint-disable-next-line
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
