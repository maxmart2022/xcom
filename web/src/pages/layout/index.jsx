import React, { createContext, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { UserContext } from 'context/UserProvider';
import { ModuleContext } from 'context/ModuleProvider';

export const LayoutContext = createContext({});

const Layout = () => {
	const isNonMobile = useMediaQuery('(min-width: 600px)');
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const currentUser = useContext(UserContext);
	const modules = useContext(ModuleContext);

	return (
		<LayoutContext.Provider value={{ currentUser, modules }}>
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
					<Outlet context={{ currentUser: currentUser, modules: modules }} />
				</Box>
			</Box>
		</LayoutContext.Provider>
	);
};

export default Layout;
