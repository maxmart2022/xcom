import React, { useContext } from 'react';
import { ThemeContext } from 'context';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';

const ThemeToggler = () => {
	const { state, setState } = useContext(ThemeContext);
	const theme = useTheme();
	return (
		<IconButton onClick={() => setState(state === 'dark' ? 'light' : 'dark')}>
			{theme.palette.mode === 'dark' ? (
				<DarkModeOutlined sx={{ fontSize: '25px' }} />
			) : (
				<LightModeOutlined sx={{ fontSize: '25px' }} />
			)}
		</IconButton>
	);
};

export default ThemeToggler;
