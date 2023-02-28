import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useContext, useMemo } from 'react';
import { ThemeContext } from 'context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { themeSettings } from 'theme';
import { AuthProvider } from 'context/AuthProvider';
import PersistLogin from 'components/PersistLogin';
import RequireAuth from 'components/RequireAuth';
import Login from 'pages/authentication';
import Dashboard from 'pages/dashboard';
import Layout from 'pages/layout';
import Actions from 'pages/actions';
import Modules from 'pages/modules';
import Users from 'pages/users';
import NewUser from 'pages/users/new';
import UserPermissions from 'pages/users/permissions';
import RequirePermission from 'components/RequirePermission';
import { UserProvider } from 'context/UserProvider';
import { ModuleProvider } from 'context/ModuleProvider';
import AccessForbidden from 'pages/accessForbidden';

function App() {
	const { state } = useContext(ThemeContext);
	const theme = useMemo(() => createTheme(themeSettings(state)), [state]);
	return (
		<div className='app'>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<AuthProvider>
						<Routes>
							<Route path='/login' element={<Login />}></Route>
							<Route element={<PersistLogin />}>
								<Route element={<RequireAuth />}>
									<Route
										element={
											<UserProvider>
												<ModuleProvider>
													<Layout />
												</ModuleProvider>
											</UserProvider>
										}
									>
										<Route path='/dashboard' element={<Dashboard />} />
										<Route
											element={
												<RequirePermission
													allowedModule={['Developer']}
													allowedAction={['All']}
												/>
											}
										>
											<Route path='/actions' element={<Actions />} />
											<Route path='/modules' element={<Modules />} />
										</Route>
										<Route
											element={
												<RequirePermission
													allowedModule={['Users']}
													allowedAction={['Authorise']}
												/>
											}
										>
											<Route
												path='/users/permit/:id'
												element={<UserPermissions />}
											/>
										</Route>
										<Route
											element={
												<RequirePermission
													allowedModule={['Users']}
													allowedAction={['Create', 'Edit']}
												/>
											}
										>
											<Route path='/users/:id' element={<NewUser />} />
										</Route>
										<Route
											element={
												<RequirePermission
													allowedModule={['Users']}
													allowedAction={['View']}
												/>
											}
										>
											<Route path='/users' element={<Users />} />
										</Route>
										<Route
											path='/access-forbidden'
											element={<AccessForbidden />}
										/>
									</Route>
								</Route>
							</Route>
						</Routes>
					</AuthProvider>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
