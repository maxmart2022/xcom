import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useContext, useMemo } from 'react';
import { ThemeContext } from 'state';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { themeSettings } from 'theme';
import Login from 'pages/authentication';
import Dashboard from 'pages/dashboard';
import Layout from 'pages/layout';

function App() {
	const { state } = useContext(ThemeContext);
	const theme = useMemo(() => createTheme(themeSettings(state)), [state]);
	return (
		<div className='app'>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path='/' element={<Login />}></Route>
						<Route element={<Layout />}>
							<Route path='/dashboard' element={<Dashboard />} />
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
