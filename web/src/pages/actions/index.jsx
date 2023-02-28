import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Alert, Stack } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import ActionForm from 'forms/ActionForm';
import useApi from 'hooks/useApi';

const Actions = () => {
	const [actions, setActions] = useState(null);
	const [refreshData, setRefreshData] = useState(false);
	const [actionId, setActionId] = useState(null);

	const { loading, error, fetchData } = useApi();

	useEffect(() => {
		const getActions = async () => {
			try {
				const response = await fetchData('action/list');
				setActions(response);
			} catch (err) {
				console.error(err);
			}
		};
		getActions();
	}, [refreshData]);

	const handleAddAction = () => {
		setRefreshData(!refreshData);
	};

	const columns = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
		},
		{
			field: '',
			headerName: ' ',
			flex: 1,
			renderCell: (params) => (
				<Stack direction='row' spacing={2}>
					<Button
						variant='contained'
						size='small'
						color='info'
						startIcon={<Edit />}
						onClick={() => setActionId(params.row._id)}
					>
						Edit
					</Button>
				</Stack>
			),
		},
	];

	const localeText = {
		noRowsLabel: 'No data added',
	};

	return (
		<Box m='1.5rem 2.5rem'>
			<Header title='Actions' subtitle='List of Actions' />
			<Box>
				{error && <Alert severity='error'>{JSON.stringify(error)}</Alert>}
				<Grid container spacing={2}>
					<Grid item xs={6} container>
						<DataGrid
							autoHeight
							loading={loading || !actions}
							getRowId={(row) => row._id}
							rows={actions || []}
							columns={columns}
							localeText={localeText}
							disableSelectionOnClick
						/>
					</Grid>
					<Grid item xs={6}>
						<ActionForm
							onAddAction={handleAddAction}
							actionId={actionId}
							setActionId={setActionId}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Actions;
