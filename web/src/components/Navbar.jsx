import React from 'react';
import {
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
} from '@mui/icons-material';
import {
	AppBar,
	InputBase,
	IconButton,
	Toolbar,
	useTheme,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import ThemeToggler from 'components/ThemeToggler';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const theme = useTheme();

	return (
		<AppBar
			sx={{
				position: 'static',
				background: 'none',
				boxShadow: 'none',
			}}
		>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				{/* LEFT SIDE */}
				<FlexBetween>
					<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
						<MenuIcon />
					</IconButton>
					<FlexBetween
						backgroundColor={theme.palette.background.alt}
						borderRadius='9px'
						gap='3rem'
						p='0.1rem 1.5rem'
					>
						<InputBase placeholder='Search...' />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				</FlexBetween>
				{/* RIGHT SIDE */}
				<FlexBetween gap='1.5rem'>
					<ThemeToggler />
					<IconButton>
						<SettingsOutlined sx={{ fontSize: '25px' }} />
					</IconButton>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
