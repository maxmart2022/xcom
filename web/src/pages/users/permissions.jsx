import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import PermissionForm from 'forms/PermissionForm';
import { useParams } from 'react-router-dom';

const UserPermissions = () => {
	const { id } = useParams();
	return (
		<Box m='1.5rem 2.5rem'>
			<Header title='User Permissions' subtitle='Permits user' />
			<Box mt='40px'>
				<PermissionForm userId={id} />
			</Box>
		</Box>
	);
};

export default UserPermissions;
