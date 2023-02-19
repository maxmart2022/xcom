import React from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { DownloadOutlined } from '@mui/icons-material';
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';

const Dashboard = () => {
	const theme = useTheme();
	return (
		<Box m='1.5rem 2.5rem'>
			<FlexBetween>
				<Header title='DASHBOARD' subtitle='Welcome to your dashboard' />

				<Box>
					<Button
						sx={{
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.background.alt,
							fontSize: '14px',
							fontWeight: 'bold',
							padding: '10px 20px',
						}}
					>
						<DownloadOutlined sx={{ mr: '10px' }} />
						Download Reports
					</Button>
				</Box>
			</FlexBetween>
		</Box>
	);
};

export default Dashboard;
