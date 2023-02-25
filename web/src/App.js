import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useContext, useMemo } from 'react';
import { ThemeContext } from 'state';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { themeSettings } from 'theme';
import { AuthProvider } from 'state/AuthProvider';
import PersistLogin from 'components/PersistLogin';
import RequireAuth from 'components/RequireAuth';
import Login from 'pages/authentication';
import Dashboard from 'pages/dashboard';
import Layout from 'pages/layout';
import Actions from 'pages/actions';
import Modules from 'pages/modules';
import Users from 'pages/users';
import NewUser from 'pages/users/new';

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
									<Route element={<Layout />}>
										<Route path='/dashboard' element={<Dashboard />} />
										<Route path='/actions' element={<Actions />} />
										<Route path='/modules' element={<Modules />} />
										<Route path='/users/:id' element={<NewUser />} />
										<Route path='/users' element={<Users />} />
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
