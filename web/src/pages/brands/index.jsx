import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Alert, Stack, Chip } from '@mui/material';
import { DomainAddOutlined, Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import { LayoutContext } from 'pages/layout';
import useApi from 'hooks/useApi';
import { hasPermission } from 'utils/hasPermission';

const Brands = () => {
	const [brands, setBrands] = useState([]);
	const [refreshData, setRefreshData] = useState(false);
	const { loading, error, fetchData, deleteData, setError } = useApi();
	const navigate = useNavigate();
	const { currentUser, modules } = useContext(LayoutContext);

	const isSuperUser = currentUser?.isSuperUser;

	const canAddorEdit =
		hasPermission(['Brands'], ['Create', 'Edit'], currentUser, modules) ||
		isSuperUser;
	const canDelete =
		hasPermission(['Brands'], ['Delete'], currentUser, modules) || isSuperUser;

	useEffect(() => {
		const getBrands = async () => {
			try {
				const response = await fetchData('brand/list');
				setBrands(response);
			} catch (err) {
				console.error(err);
			}
		};
		getBrands();
	}, [refreshData]);

	const handleEdit = (brandId) => {
		if (!canAddorEdit) {
			navigate('/access-forbidden');
		}
		navigate(`${brandId}`);
	};

	const handleDelete = async (brandId) => {
		if (!canDelete) {
			navigate('/access-forbidden');
		}
		try {
			await deleteData(`brand/delete/${brandId}`);
			setRefreshData(!refreshData);
			setError(null);
		} catch (err) {
			console.error(err);
		}
	};

	const columns = [
		{
			field: 'name',
			headerName: 'Brand Name',
			flex: 1,
		},
		{
			field: 'parent',
			headerName: 'Parent Brand',
			flex: 1,
			renderCell: (params) => (
				<div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
					<Chip
						label={params.row.parent ? params.row.parent.name : 'No parent'}
					/>
				</div>
			),
		},
		{
			field: 'child',
			headerName: 'Child Brands',
			flex: 1,
			renderCell: (params) => (
				<div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
					{params.row.child.map((childBrand) => (
						<Chip label={childBrand.name} key={childBrand.id} />
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
				title='Brands'
				subtitle='List of Brands'
				button={
					(canAddorEdit || currentUser?.isSuperUser) && [
						<DomainAddOutlined />,
						'New Brand',
					]
				}
				linkTo='/brands/new'
			/>
			<Box>
				{error && (
					<Alert severity='error' mb='20px'>
						{JSON.stringify(error)}
					</Alert>
				)}
				<DataGrid
					autoHeight
					loading={loading || !brands}
					getRowId={(row) => row.id}
					rows={brands || []}
					columns={columns}
					localeText={localeText}
				/>
			</Box>
		</Box>
	);
};

export default Brands;
