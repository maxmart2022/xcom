import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Alert, Stack, Chip } from '@mui/material';
import { Edit, Delete, PixOutlined } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import { LayoutContext } from 'pages/layout';
import useApi from 'hooks/useApi';
import { hasPermission } from 'utils/hasPermission';

const Variants = () => {
	const [variants, setVariants] = useState([]);
	const [refreshData, setRefreshData] = useState(false);
	const { loading, error, fetchData, deleteData, setError } = useApi();
	const navigate = useNavigate();
	const { currentUser, modules } = useContext(LayoutContext);

	const isSuperUser = currentUser?.isSuperUser;

	const canAddorEdit =
		hasPermission(['Variants'], ['Create', 'Edit'], currentUser, modules) ||
		isSuperUser;
	const canDelete =
		hasPermission(['Variants'], ['Delete'], currentUser, modules) ||
		isSuperUser;

	useEffect(() => {
		const getVariants = async () => {
			try {
				const response = await fetchData('variant/list');
				setVariants(response);
			} catch (err) {
				console.error(err);
			}
		};
		getVariants();
	}, [refreshData]);

	const handleEdit = (variantId) => {
		if (!canAddorEdit) {
			navigate('/access-forbidden');
		}
		navigate(`${variantId}`);
	};

	const handleDelete = async (variantId) => {
		if (!canDelete) {
			navigate('/access-forbidden');
		}
		try {
			await deleteData(`variant/delete/${variantId}`);
			setRefreshData(!refreshData);
			setError(null);
		} catch (err) {
			console.error(err);
		}
	};

	const columns = [
		{
			field: 'name',
			headerName: 'Variant Name',
			flex: 1,
		},
		{
			field: 'values',
			headerName: 'Variant Values',
			flex: 1,
			renderCell: (params) => (
				<div style={{ padding: '10px' }}>
					{params.row.values.map((value) => (
						<Chip label={value} sx={{ margin: '1px' }} />
					))}
				</div>
			),
		},
		{
			field: 'categories',
			headerName: 'Categories',
			flex: 1,
			renderCell: (params) => (
				<div>
					{params.row.categories.map((category, index) => (
						<Chip label={category.name} key={index} sx={{ margin: '1px' }} />
					))}
				</div>
			),
		},
		{
			field: '',
			headerName: ' ',
			flex: 1,
			hide: !canAddorEdit && !canDelete,
			renderCell: (params) => (
				<Stack direction='row' spacing={2}>
					{canAddorEdit && (
						<Button
							variant='contained'
							size='small'
							color='info'
							startIcon={<Edit />}
							onClick={() => handleEdit(params.row.id)}
						>
							Edit
						</Button>
					)}
					{canDelete && (
						<Button
							variant='contained'
							size='small'
							color='error'
							startIcon={<Delete />}
							onClick={() => handleDelete(params.row.id)}
						>
							Delete
						</Button>
					)}
				</Stack>
			),
		},
	];

	const localeText = {
		noRowsLabel: 'No data added',
	};

	return (
		<Box m='1.5rem 2.5rem'>
			<Header
				title='Variants'
				subtitle='List of Variants'
				button={
					(canAddorEdit || currentUser?.isSuperUser) && [
						<PixOutlined />,
						'New Variant',
					]
				}
				linkTo='/variants/new'
			/>
			<Box>
				{error && (
					<Alert severity='error' mb='20px'>
						{JSON.stringify(error)}
					</Alert>
				)}
				<DataGrid
					autoHeight
					loading={loading || !variants}
					getRowId={(row) => row.id}
					rows={variants || []}
					columns={columns}
					localeText={localeText}
					getRowHeight={() => 'auto'}
				/>
			</Box>
		</Box>
	);
};

export default Variants;
