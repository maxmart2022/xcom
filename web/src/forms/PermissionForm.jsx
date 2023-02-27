import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useTheme,
	Box,
	Stack,
	Button,
	Checkbox,
	CircularProgress,
	Alert,
	Snackbar,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import useApi from 'hooks/useApi';
import useForm from 'hooks/useForm';
import permissionSchema from 'validations/permissionSchema';

const PermissionForm = ({ userId }) => {
	const theme = useTheme();
	const initialValues = { userId, permissions: [] };
	const [actions, setActions] = useState([]);
	const [modules, setModules] = useState(null);
	const [open, setOpen] = useState(false);

	const { loading, error, fetchData, postData } = useApi();
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;
		const getActions = async () => {
			try {
				const response = await fetchData('action/list');
				isMounted && setActions(response);
			} catch (err) {
				console.error(err);
			}
		};
		getActions();
		return () => (isMounted = false);
	}, []);

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
	}, []);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const doSubmit = async (payload) => {
		try {
			const responseData = await postData('auth/permit', payload);
			responseData ? setOpen(true) : setOpen(false);
		} catch (err) {
			console.error(err);
		}
	};

	const { values, setValues, handleSubmit } = useForm(
		initialValues,
		permissionSchema,
		doSubmit
	);

	useEffect(() => {
		if (!userId) {
			navigate('/users');
		} else {
			const getPermissions = async () => {
				try {
					const response = await fetchData(`auth/permit/list/${userId}`);
					setValues({ userId, permissions: response });
				} catch (err) {
					console.error(err);
				}
			};
			getPermissions();
		}
	}, []);

	const handlePermissionChange = (e, moduleId) => {
		const { checked, value } = e.target;

		setValues((prevValues) => {
			const { permissions } = prevValues;
			const moduleIndex = permissions.findIndex(
				(permission) => permission.module === moduleId
			);

			if (moduleIndex === -1) {
				const newPermission = { module: moduleId, actions: [value] };
				permissions.push(newPermission);
				return { ...prevValues, permissions };
			}

			const actions = permissions[moduleIndex].actions || [];

			if (checked) {
				actions.push(value);
			} else {
				const actionIndex = actions.indexOf(value);
				if (actionIndex !== -1) {
					actions.splice(actionIndex, 1);
				}
			}

			permissions[moduleIndex].actions = actions;
			return { ...prevValues, permissions };
		});
	};

	const getActionsTableCell = () => {
		return actions.map((action) => (
			<TableCell key={action._id}>{action.name}</TableCell>
		));
	};

	const hasPermission = (moduleId, actionId) => {
		return values.permissions.some((perm) => {
			return perm.module === moduleId && perm.actions.includes(actionId);
		});
	};

	const getCheckbox = (module, actionId) => {
		return (
			<TableCell key={`${module._id}-${actionId}`}>
				{module.actions.some((action) => action._id === actionId) && (
					<Checkbox
						value={actionId}
						checked={hasPermission(module._id, actionId)}
						onChange={(e) => handlePermissionChange(e, module._id)}
						color='secondary'
					/>
				)}
			</TableCell>
		);
	};

	return (
		<>
			<form style={{ display: 'contents' }} onSubmit={handleSubmit}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Module</TableCell>
							{actions.length > 0 && getActionsTableCell()}
						</TableRow>
					</TableHead>
					<TableBody>
						{modules &&
							modules.map((module) => (
								<TableRow key={module._id}>
									<TableCell>{module.name}</TableCell>
									{actions.map((action) => getCheckbox(module, action._id))}
								</TableRow>
							))}
					</TableBody>
				</Table>

				{error && <Alert severity='error'>{JSON.stringify(error)}</Alert>}
				<Box mt='20px'>
					<Stack spacing={2} direction='row'>
						<Button
							type='submit'
							sx={{
								backgroundColor: theme.palette.secondary[300],
								color: theme.palette.background.alt,
								fontSize: '14px',
								fontWeight: 'bold',
								padding: '10px 20px',
							}}
						>
							<SaveOutlined sx={{ mr: '10px' }} />
							Save
						</Button>
					</Stack>
				</Box>
			</form>
			{loading && <CircularProgress />}
			<Snackbar
				open={open}
				autoHideDuration={6000}
				message='Permission saved'
			/>
		</>
	);
};

export default PermissionForm;
