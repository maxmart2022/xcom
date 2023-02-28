import { Typography, Box, useTheme, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, subtitle, button, linkTo }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(linkTo);
	};
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', mb: '20px' }}>
			<Box sx={{ flexGrow: 1 }}>
				<Typography
					variant='h2'
					color={theme.palette.secondary[100]}
					fontWeight='bold'
					sx={{ mb: '5px' }}
				>
					{title}
				</Typography>
				<Typography variant='h5' color={theme.palette.secondary[300]}>
					{subtitle}
				</Typography>
			</Box>
			{button && (
				<Button
					variant='contained'
					size='small'
					color='secondary'
					onClick={handleClick}
				>
					{button[0]} {button[1]}
				</Button>
			)}
		</Box>
	);
};

export default Header;
