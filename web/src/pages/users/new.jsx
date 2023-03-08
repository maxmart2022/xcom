import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import UserForm from 'forms/UserForm';

const NewUser = () => {
	return (
		<Box m='1.5rem 2.5rem'>
			<Header title='User Form' subtitle='Create user' />
			<Box>
				<UserForm />
			</Box>
		</Box>
	);
};

export default NewUser;
