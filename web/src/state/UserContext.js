import React, { createContext, useEffect, useState } from 'react';
import useAuthService from 'services/authService';

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});
	const { getLoggedinUser } = useAuthService();

	useEffect(() => {
		const getCurrentUser = async () => {
			const responseData = await getLoggedinUser();
			if (
				responseData &&
				responseData.currentUser &&
				responseData.currentUser !== 'null'
			) {
				setCurrentUser(responseData.currentUser);
			}
		};
		getCurrentUser();
		// eslint-disable-next-line
	}, []);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
