import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { hasPermission } from 'utils/hasPermission';
import { LayoutContext } from 'pages/layout';

const Users = () => {
	const [users, setUsers] = useState(null);
	const [refreshData, setRefreshData] = useState(false);
	const { loading, error, fetchData, putData, deleteData, setError } = useApi();
	const navigate = useNavigate();
	const { currentUser, modules } = useContext(LayoutContext);

	const isSuperUser = currentUser?.isSuperUser;

	const canAddorEdit =
		hasPermission(['Users'], ['Create', 'Edit'], currentUser, modules) ||
		isSuperUser;
	const canSuspend =
		hasPermission(['Users'], ['Suspend'], currentUser, modules) || isSuperUser;
	const canActivate =
		hasPermission(['Users'], ['Activate'], currentUser, modules) || isSuperUser;
	const canAuthorise =
		hasPermission(['Users'], ['Authorise'], currentUser, modules) ||
		isSuperUser;
	const canDelete =
		hasPermission(['Users'], ['Delete'], currentUser, modules) || isSuperUser;

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
		if (!canAddorEdit) {
			navigate('/access-forbidden');
		}
		navigate(`${userId}`);
	};

	const handlePermit = (userId) => {
		if (!canAuthorise) {
			navigate('/access-forbidden');
		}
		navigate(`permit/${userId}`);
	};

	const handleActivation = async (userId, userActive) => {
		if (!canActivate && !canSuspend) {
			navigate('/access-forbidden');
		}
		try {
			await putData(`auth/suspend/${userId}`, { isActive: !userActive });
			setRefreshData(!refreshData);
			setError(null);
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async (userId) => {
		if (!canDelete) {
			navigate('/access-forbidden');
		}
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
			hide:
				!canActivate &&
				!canSuspend &&
				!canAddorEdit &&
				!canAuthorise &&
				!canDelete,
			renderCell: (params) => (
				<Stack direction='row' spacing={2}>
					{canAuthorise && (
						<Button
							variant='contained'
							size='small'
							color='info'
							startIcon={<Key />}
							onClick={() => handlePermit(params.row._id)}
						>
							Authorise
						</Button>
					)}
					{canAddorEdit && (
						<Button
							variant='contained'
							size='small'
							color='info'
							startIcon={<Edit />}
							onClick={() => handleEdit(params.row._id)}
						>
							Edit
						</Button>
					)}
					{(canActivate || canSuspend) && (
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
					)}
					{canDelete && (
						<Button
							variant='contained'
							size='small'
							color='error'
							startIcon={<Delete />}
							onClick={() => handleDelete(params.row._id)}
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
				title='Users'
				subtitle='List of Users'
				button={
					(canAddorEdit || currentUser?.isSuperUser) && [
						<PersonAddOutlined />,
						'New User',
					]
				}
				linkTo='/users/new'
			/>
			<Box>
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
