import React from 'react';
import { Box, Drawer, IconButton, Typography, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import SideMenu from './common/SideMenu';

const Sidebar = ({
	drawerWidth,
	isSidebarOpen,
	setIsSidebarOpen,
	isNonMobile,
}) => {
	const theme = useTheme();

	return (
		<Box component='nav'>
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					variant='persistent'
					anchor='left'
					sx={{
						width: drawerWidth,
						'& .MuiDrawer-paper': {
							color: theme.palette.secondary[200],
							backgroundColor: theme.palette.background.alt,
							boxSixing: 'border-box',
							borderWidth: isNonMobile ? 0 : '2px',
							width: drawerWidth,
						},
					}}
				>
					<Box width='100%'>
						<Box m='1.5rem 2rem 2rem 3rem'>
							<FlexBetween color={theme.palette.secondary.main}>
								<Box display='flex' alignItems='center' gap='0.5rem'>
									<Typography variant='h4' fontWeight='bold'>
										MAXMART
									</Typography>
								</Box>
								{!isNonMobile && (
									<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
										<MenuIcon />
									</IconButton>
								)}
							</FlexBetween>
						</Box>
						<SideMenu />
					</Box>
				</Drawer>
			)}
		</Box>
	);
};

export default Sidebar;
