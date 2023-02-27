import React, { useState, useEffect } from 'react';
import { Box, Button, Alert, Stack, Chip } from '@mui/material';
import {
	Edit,
	Delete,
	PersonAddOutlined,
	PersonOff,
	VerifiedUser,
	Key,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import useApi from 'hooks/useApi';
import { useNavigate } from 'react-router-dom';

const Users = () => {
	const [users, setUsers] = useState(null);
	const [refreshData, setRefreshData] = useState(false);
	const { loading, error, fetchData, putData, deleteData, setError } = useApi();
	const navigate = useNavigate();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await fetchData('auth/list');
				setUsers(response);
			} catch (err) {
				console.error(err);
			}
		};
		getUsers();
	}, [refreshData]);

	const handleEdit = (userId) => {
		navigate(`${userId}`);
	};

	const handlePermit = (userId) => {
		navigate(`permit/${userId}`);
	};

	const handleActivation = async (userId, userActive) => {
		try {
			await putData(`auth/suspend/${userId}`, { isActive: !userActive });
			setRefreshData(!refreshData);
			setError(null);
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async (userId) => {
		try {
			await deleteData(`auth/delete/${userId}`);
			setRefreshData(!refreshData);
			setError(null);
		} catch (err) {
			console.error(err);
		}
	};

	const columns = [
		{
			field: 'email',
			headerName: 'Email',
			flex: 0.5,
		},
		{
			field: 'role',
			headerName: 'Interface',
			flex: 0.5,
		},
		{
			field: 'isActive',
			headerName: 'Status',
			renderCell: (params) => (
				<Chip
					label={params.row.isActive ? 'Active' : 'Suspended'}
					color={params.row.isActive ? 'success' : 'warning'}
				/>
			),
			flex: 0.5,
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
						startIcon={<Key />}
						onClick={() => handlePermit(params.row._id)}
					>
						Authorise
					</Button>
					<Button
						variant='contained'
						size='small'
						color='info'
						startIcon={<Edit />}
						onClick={() => handleEdit(params.row._id)}
					>
						Edit
					</Button>
					<Button
						variant='contained'
						size='small'
						color={params.row.isActive ? 'warning' : 'success'}
						startIcon={params.row.isActive ? <PersonOff /> : <VerifiedUser />}
						onClick={() =>
							handleActivation(params.row._id, params.row.isActive)
						}
					>
						{params.row.isActive ? 'Suspend' : 'Activate'}
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
			<Header
				title='Users'
				subtitle='List of Users'
				button={[<PersonAddOutlined />, 'New User']}
				linkTo='/users/new'
			/>
			<Box mt='40px'>
				{error && (
					<Alert severity='error' mb='20px'>
						{JSON.stringify(error)}
					</Alert>
				)}
				<DataGrid
					autoHeight
					loading={loading || !users}
					getRowId={(row) => row._id}
					rows={users || []}
					columns={columns}
					localeText={localeText}
				/>
			</Box>
		</Box>
	);
};

export default Users;
