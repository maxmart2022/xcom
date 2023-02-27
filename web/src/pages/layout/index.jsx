import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { UserProvider } from 'context/UserProvider';
import { ModuleProvider } from 'context/ModuleProvider';

const Layout = () => {
	const isNonMobile = useMediaQuery('(min-width: 600px)');
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	return (
		<UserProvider>
			<ModuleProvider>
				<Box
					display={isNonMobile ? 'flex' : 'block'}
					width='100%'
					height='100%'
				>
					<Sidebar
						isNonMobile={isNonMobile}
						drawerWidth='250px'
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
					/>
					<Box flexGrow={1}>
						<Navbar
							isSidebarOpen={isSidebarOpen}
							setIsSidebarOpen={setIsSidebarOpen}
						/>
						<Outlet />
					</Box>
				</Box>
			</ModuleProvider>
		</UserProvider>
	);
};

export default Layout;
