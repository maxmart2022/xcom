import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Alert, Stack, Chip } from '@mui/material';
import { Edit, Delete, PixOutlined } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import { LayoutContext } from 'pages/layout';
import useApi from 'hooks/useApi';
import { hasPermission } from 'utils/hasPermission';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [refreshData, setRefreshData] = useState(false);
	const { loading, error, fetchData, deleteData, setError } = useApi();
	const navigate = useNavigate();
	const { currentUser, modules } = useContext(LayoutContext);

	const isSuperUser = currentUser?.isSuperUser;

	const canAddorEdit =
		hasPermission(['Products'], ['Create', 'Edit'], currentUser, modules) ||
		isSuperUser;
	const canDelete =
		hasPermission(['Products'], ['Delete'], currentUser, modules) ||
		isSuperUser;

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await fetchData('product/list');
				setProducts(response);
			} catch (err) {
				console.error(err);
			}
		};
		getProducts();
	}, [refreshData]);

	const handleEdit = (productId) => {
		if (!canAddorEdit) {
			navigate('/access-forbidden');
		}
		navigate(`${productId}`);
	};

	const handleDelete = async (productId) => {
		if (!canDelete) {
			navigate('/access-forbidden');
		}
		try {
			await deleteData(`product/delete/${productId}`);
			setRefreshData(!refreshData);
			setError(null);
		} catch (err) {
			console.error(err);
		}
	};

	const columns = [
		{
			field: 'productName',
			headerName: 'Product Name',
			flex: 1,
		},
		{
			field: 'description',
			headerName: 'Description',
			flex: 1,
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
				title='Products'
				subtitle='List of Products'
				button={
					(canAddorEdit || currentUser?.isSuperUser) && [
						<PixOutlined />,
						'New product',
					]
				}
				linkTo='/products/new'
			/>
			<Box>
				{error && (
					<Alert severity='error' mb='20px'>
						{JSON.stringify(error)}
					</Alert>
				)}
				<DataGrid
					autoHeight
					loading={loading || !products}
					getRowId={(row) => row.id}
					rows={products || []}
					columns={columns}
					localeText={localeText}
					getRowHeight={() => 'auto'}
				/>
			</Box>
		</Box>
	);
};

export default Products;
