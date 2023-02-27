import React, { useState, useEffect } from 'react';
import { Box, Grid, Alert, Stack, Button, Chip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import useApi from 'hooks/useApi';
import ModuleForm from 'forms/ModuleForm';

const Modules = () => {
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
			flex: 0.5,
		},
		{
			field: 'actions',
			headerName: 'Rights',
			flex: 1,
			renderCell: (params) => (
				<div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
					{params.row.actions.map((action, index) => (
						<Chip label={action.name} key={index} />
					))}
				</div>
			),
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
						onClick={() => setModuleId(params.row._id)}
					>
						Edit
					</Button>
					<Button
						variant='contained'
						size='small'
						color='error'
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
			<Box mt='40px'>
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
							getRowHeight={(params) => {
								const numLines = params.row?.actions
									? params.row.actions.length
									: 1;
								// add some padding for each line of text
								const rowHeight = 40 + numLines * 24;
								return rowHeight;
							}}
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
