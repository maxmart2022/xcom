import React, { useState, useEffect } from 'react';
import { Box, Grid, useTheme, Alert, Stack, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import useApi from 'hooks/useApi';
import ModuleForm from 'forms/ModuleForm';

const Modules = () => {
	const theme = useTheme();
	const [modules, setModules] = useState(null);
	const [refreshData, setRefreshData] = useState(false);
	const [moduleId, setModuleId] = useState(null);

	const { loading, error, fetchData, deleteData } = useApi();

	useEffect(() => {
		let isMounted = true;
		const getModules = async () => {
			try {
				const response = await fetchData('module/list');
				isMounted && setModules(response);
			} catch (err) {
				console.error(err);
			}
		};
		getModules();

		return () => (isMounted = false);
	}, [refreshData]);

	const handleAddModule = () => {
		setRefreshData(!refreshData);
	};

	const handleDelete = async (moduleId) => {
		try {
			await deleteData(`module/delete/${moduleId}`, {});
			setRefreshData(!refreshData);
		} catch (err) {
			console.error(err);
		}
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
		{
			field: '',
			headerName: ' ',
			flex: 1,
			renderCell: (params) => (
				<Stack direction='row' spacing={2}>
					<Button
						variant='contained'
						size='small'
						color='secondary'
						startIcon={<Edit />}
						onClick={() => setModuleId(params.row._id)}
					>
						Edit
					</Button>
					<Button
						variant='contained'
						size='small'
						color='secondary'
						startIcon={<Delete />}
						onClick={() => handleDelete(params.row._id)}
					>
						Delete
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
				{error && <Alert severity='error'>{JSON.stringify(error)}</Alert>}
				<Grid container spacing={2}>
					<Grid item xs={8} container style={{ height: '100%' }}>
						<DataGrid
							autoHeight
							loading={loading || !modules}
							getRowId={(row) => row._id}
							rows={modules || []}
							columns={columns}
							localeText={localeText}
						/>
					</Grid>
					<Grid item xs={4}>
						<ModuleForm
							onAddModule={handleAddModule}
							moduleId={moduleId}
							setModuleId={setModuleId}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Modules;
