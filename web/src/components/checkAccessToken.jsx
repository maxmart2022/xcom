import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useTokenService from 'services/tokenService';

const CheckAccessToken = ({ children }) => {
	const [isTokenValid, setIsTokenValid] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const currentTime = Math.floor(Date.now() / 1000);
	const { refreshToken } = useTokenService();

	useEffect(() => {
		const checkToken = async () => {
			const accessToken = JSON.parse(localStorage.getItem('accessToken'));
			if (!accessToken || currentTime >= accessToken.expiresAt) {
				try {
					// Make a request to your backend to check the token's validity
					const responseData = await refreshToken();

					if (responseData) {
						setIsTokenValid(true);
						localStorage.setItem(
							'accessToken',
							JSON.stringify({
								value: responseData.access_token,
								expiresAt: responseData.expiresAt,
							})
						);
					} else {
						setIsTokenValid(false);
					}
				} catch (error) {
					console.error('Refresh Error:', error);
					setIsTokenValid(false);
				}
			} else {
				console.log('valid');
				setIsTokenValid(true);
			}
			setIsLoading(false);
		};
		checkToken();
	}, [refreshToken, currentTime]);

	if (!isTokenValid && !isLoading) {
		return <Navigate to='/' />;
	} else {
		return children;
	}
};

export default CheckAccessToken;
