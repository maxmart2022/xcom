import React, { createContext, useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import useApi from 'hooks/useApi';

export const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
	const [modules, setModules] = useState([]);
	const [loading, setLoading] = useState(true);
	const { fetchData } = useApi();

	useEffect(() => {
		const getModules = async () => {
			try {
				const response = await fetchData('module/list');
				setModules(response);
			} catch (err) {
			} finally {
				setLoading(false);
			}
		};
		getModules();
	}, []);

	return (
		<ModuleContext.Provider value={modules}>
			{loading ? (
				<Skeleton animation='wave' variant='rectangular' />
			) : (
				<React.Fragment>{children}</React.Fragment>
			)}
		</ModuleContext.Provider>
	);
};
