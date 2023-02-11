import React from 'react';
import { Redirect } from 'react-router-dom';

const requireAuth = (Component) => {
	return (props) => {
		if (!isAuthenticated()) {
			return <Redirect to='/' />;
		}
		return <Component {...props} />;
	};
};

const isAuthenticated = () => {
	const access_token = localStorage.getItem('x-access-token');
	if (!access_token) return false;
	return true;
};

export default requireAuth;
