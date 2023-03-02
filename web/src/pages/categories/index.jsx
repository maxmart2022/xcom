import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Alert, Stack, Chip } from '@mui/material';
import { DomainAddOutlined, Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import { LayoutContext } from 'pages/layout';
import useApi from 'hooks/useApi';
import { hasPermission } from 'utils/hasPermission';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [refreshData, setRefreshData] = useState(false);
	const { loading, error, fetchData, putData, deleteData, setError } = useApi();
	const navigate = useNavigate();
	const { currentUser, modules } = useContext(LayoutContext);

	const isSuperUser = currentUser?.isSuperUser;

	const canAddorEdit =
		hasPermission(['Categories'], ['Create', 'Edit'], currentUser, modules) ||
		isSuperUser;
	const canDelete =
		hasPermission(['Categories'], ['Delete'], currentUser, modules) ||
		isSuperUser;

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await fetchData('category/list');
				setCategories(response);
			} catch (err) {
				console.error(err);
			}
		};
		getCategories();
	}, [refreshData]);

	const handleEdit = (categoryId) => {
		if (!canAddorEdit) {
			navigate('/access-forbidden');
		}
		navigate(`${categoryId}`);
	};

	const handleDelete = async (categoryId) => {
		if (!canDelete) {
			navigate('/access-forbidden');
		}
		try {
			await deleteData(`category/delete/${categoryId}`);
			setRefreshData(!refreshData);
			setError(null);
		} catch (err) {
			console.error(err);
		}
	};

	const columns = [
		{
			field: 'name',
			headerName: 'Category Name',
			flex: 1,
		},
		{
			field: 'parent',
			headerName: 'Parent Category',
			flex: 1,
			renderCell: (params) => (
				<div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
					{params.row.parent.map((parentCategory, index) => (
						<Chip label={parentCategory.name} key={index} />
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
				title='Categories'
				subtitle='List of Categories'
				button={
					(canAddorEdit || currentUser?.isSuperUser) && [
						<DomainAddOutlined />,
						'New Category',
					]
				}
				linkTo='/categories/new'
			/>
			<Box>
				{error && (
					<Alert severity='error' mb='20px'>
						{JSON.stringify(error)}
					</Alert>
				)}
				<DataGrid
					autoHeight
					loading={loading || !categories}
					getRowId={(row) => row.id}
					rows={categories || []}
					columns={columns}
					localeText={localeText}
				/>
			</Box>
		</Box>
	);
};

export default Categories;
