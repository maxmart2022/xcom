import React, { useEffect } from 'react';
import { Box, Paper, Grid, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import useActionService from 'services/actionService';
import ActionForm from 'forms/ActionForm';

const Actions = () => {
	const theme = useTheme();
	const { getActions, loading, error, data } = useActionService();
	console.log('data', data);

	useEffect(() => {
		const getData = async () => {
			await getActions();
		};
		getData();
	}, [getActions]);

	const columns = [
		{
			field: '_id',
			headerName: 'ID',
		},
		{
			field: 'name',
			headerName: 'Name',
		},
	];

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
					<Grid item xs={8} container height='75vh'>
						<DataGrid
							loading={loading || !data}
							getRowId={(row) => row._id}
							rows={data || []}
							columns={columns}
							localeText='No Actions added'
						/>
					</Grid>
					<Grid item xs={4}>
						<ActionForm />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Actions;
