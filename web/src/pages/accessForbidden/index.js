import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useTheme } from '@mui/material';
import Header from 'components/Header';
import accessForbiddenImage from 'assets/accessForbidden.png';
import { ArrowBack } from '@mui/icons-material';
const AccessForbidden = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	const goBack = () => navigate(-1);
	return (
		<Box m='1.5rem 2.5rem'>
			<Header
				title='Access Forbidden'
				subtitle='You are not permitted to this page'
			/>

			<Box
				component='img'
				alt='access forbidden image'
				src={accessForbiddenImage}
				sx={{ objectFit: 'cover' }}
			/>
			<Box>
				<Button
					sx={{
						backgroundColor: theme.palette.secondary.light,
						color: theme.palette.background.alt,
						fontSize: '14px',
						fontWeight: 'bold',
						padding: '10px 20px',
					}}
					onClick={goBack}
				>
					<ArrowBack sx={{ mr: '10px' }} />
					Go Back
				</Button>
			</Box>
		</Box>
	);
};

export default AccessForbidden;
