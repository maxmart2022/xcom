import React, { useState, useEffect } from 'react';
import { Box, Grid, Stack, useTheme, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import Header from 'components/Header';
import useModuleService from 'services/moduleService';
import ModuleForm from 'forms/ModuleForm';

const Modules = () => {
	const theme = useTheme();
	const [refreshData, setRefreshData] = useState(false);
	const { getModules, loading, data } = useModuleService();
	const [selectedModule, setSelectedModule] = useState(null);

	useEffect(() => {
		const getData = async () => {
			await getModules();
		};
		getData();
		// eslint-disable-next-line
	}, [refreshData]);

	const handleAddModule = () => {
		setRefreshData(!refreshData);
	};

	const handleEdit = (moduleId) => {
		const module = data.find((m) => m._id === moduleId);
		setSelectedModule(module);
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
						onClick={() => handleEdit(params.row._id)}
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
							loading={loading || !data}
							getRowId={(row) => row._id}
							rows={data || []}
							columns={columns}
							localeText={localeText}
						/>
					</Grid>
					<Grid item xs={4}>
						<ModuleForm
							onAddModule={handleAddModule}
							selectedModule={selectedModule}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Modules;
