import React, { useState, useContext } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { UserContext, UserProvider } from 'context/UserProvider';
import { ModuleContext, ModuleProvider } from 'context/ModuleProvider';

const Layout = () => {
	const isNonMobile = useMediaQuery('(min-width: 600px)');
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const currentUser = useContext(UserContext);
	const modules = useContext(ModuleContext);

	return (
		<Box display={isNonMobile ? 'flex' : 'block'} width='100%' height='100%'>
			<Sidebar
				isNonMobile={isNonMobile}
				drawerWidth='250px'
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
				currentUser={currentUser}
				modules={modules}
			/>
			<Box flexGrow={1}>
				<Navbar
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
					currentUser={currentUser}
					modules={modules}
				/>
				<Outlet currentUser={currentUser} modules={modules} />
			</Box>
		</Box>
	);
};

export default Layout;
