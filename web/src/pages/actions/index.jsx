import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import Header from 'components/Header';
import ActionForm from 'forms/ActionForm';
import { axiosPrivate } from 'api/axios';

const Actions = () => {
	const theme = useTheme();
	const axiosPrivate = useAxiosPrivate();
	const [loading, setLoading] = useState(false);
	const [actions, setActions] = useState(null);
	const [error, setError] = useState(null);
	const [refreshData, setRefreshData] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getActions = async () => {
			try {
				setLoading(true);
				const response = await axiosPrivate.get('action/list', {
					signal: controller.signal,
				});
				isMounted && setActions(response.data);
			} catch (err) {
				if (err.response && err.response.data && err.response.data.errors) {
					setError(err.response.data.errors[0].message);
				} else if (err.response?.status === 401) {
					navigate('/login', { state: { from: location }, replace: true });
				} else {
					setError('Something unexepected !!!');
				}
			} finally {
				setLoading(false);
			}
		};
		getActions();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const handleAddAction = () => {
		setRefreshData(!refreshData);
	};

	const columns = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
		},
	];

	const localeText = {
		noRowsLabel: 'No data added',
	};

	return (
		<Box m='1.5rem 2.5rem'>
			<Header title='Actions' subtitle='List of Actions' />
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
							loading={loading || !actions}
							getRowId={(row) => row._id}
							rows={actions || []}
							columns={columns}
							localeText={localeText}
						/>
					</Grid>
					<Grid item xs={4}>
						<ActionForm onAddAction={handleAddAction} />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Actions;
