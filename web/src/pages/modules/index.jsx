import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const Modules = () => {
	const theme = useTheme();
	const axiosPrivate = useAxiosPrivate();
	const [loading, setLoading] = useState(false);
	const [modules, setModules] = useState(null);
	const [error, setError] = useState(null);
	const [refreshData, setRefreshData] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getModules = async () => {
			try {
				setLoading(true);
				const response = await axiosPrivate.get('module/list', {
					signal: controller.signal,
				});
				isMounted && setModules(response.data);
			} catch (err) {
				if (err.response && err.response.data && err.response.data.errors) {
					setError(err.response.data.errors[0].message);
				} else if (
					err.response?.status === 401 ||
					err.response?.status === 403
				) {
					navigate('/login', { state: { from: location }, replace: true });
				} else {
					setError('Something unexepected !!!');
				}
			} finally {
				setLoading(false);
			}
		};
		getModules();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const handleAddModule = () => {
		setRefreshData(!refreshData);
	};

	const columns = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
		},
		{
			field: 'actions',
			headerName: 'Rights',
			flex: 1,
			valueGetter: (params) =>
				params.row.actions.map((action) => action.name).join(', '),
		},
	];

	const localeText = {
		noRowsLabel: 'No data added',
	};

	return (
		<Box m='1.5rem 2.5rem'>
			<Header title='Modules' subtitle='List of Modules' />
			<Box
				mt='40px'
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none',
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none',
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderBottom: 'none',
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: theme.palette.primary.light,
					},
					'& .MuiDataGrid-footerContainer': {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderTop: 'none',
					},
					'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
						color: `${theme.palette.secondary[200]} !important`,
					},
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={8} container>
						<DataGrid
							autoHeight
							loading={loading || !modules}
							getRowId={(row) => row._id}
							rows={modules || []}
							columns={columns}
							localeText={localeText}
						/>
					</Grid>
					<Grid item xs={4}></Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Modules;
