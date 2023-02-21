import React, { useEffect } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import {
	TextField,
	FormGroup,
	FormControlLabel,
	Checkbox,
	CircularProgress,
	Alert,
} from '@mui/material';
import { SaveAltOutlined } from '@mui/icons-material';
import useActionService from 'services/actionService';
import useModuleService from 'services/moduleService';
import moduleSchema from 'validations/moduleSchema';
import useForm from 'hooks/useForm';

const ModuleForm = ({ onAddModule, selectedModule }) => {
	const theme = useTheme();
	const initialValues = { name: '', actions: [] };
	const {
		getActions,
		loading: actionLoading,
		data: actionData,
	} = useActionService();
	const { newModule, updateModule, loading, error } = useModuleService();

	useEffect(() => {
		const getData = async () => {
			await getActions();
		};
		getData();
	}, [onAddModule]);

	const doSubmit = async (payload) => {
		let responseData = null;
		if (selectedModule) {
			responseData = await updateModule(payload);
		} else {
			responseData = await newModule(payload);
		}
		if (responseData) {
			onAddModule();
		}
	};
	const {
		values,
		setValues,
		handleChange,
		handleCheckboxChange,
		handleSubmit,
		errors,
	} = useForm(initialValues, moduleSchema, doSubmit);

	console.log(selectedModule);
	console.log(actionData);

	useEffect(() => {
		if (selectedModule) {
			setValues({
				name: selectedModule.name,
				actions: selectedModule.actions.map((a) => a._id),
			});
		} else {
			setValues(initialValues);
		}
	}, [selectedModule]);

	return (
		<>
			<form style={{ display: 'contents' }} onSubmit={handleSubmit}>
				<TextField
					type='text'
					variant='outlined'
					placeholder='Module Name'
					name='name'
					label='Name'
					autoFocus
					margin='normal'
					value={values.name || ''}
					onChange={handleChange}
					error={!!errors.name}
					helperText={errors.name}
				/>
				{actionLoading ? (
					<CircularProgress />
				) : (
					<FormGroup>
						{actionData &&
							actionData.map((action) => (
								<FormControlLabel
									key={action._id}
									control={
										<Checkbox
											name='actions'
											value={action._id || ''}
											onChange={handleCheckboxChange}
											sx={{
												color: theme.palette.secondary[300],
											}}
										/>
									}
									label={action.name}
								/>
							))}
					</FormGroup>
				)}
				{error && <Alert severity='error'>{JSON.stringify(error)}</Alert>}
				<Box mt='20px'>
					<Button
						type='submit'
						sx={{
							backgroundColor: theme.palette.secondary[300],
							color: theme.palette.background.alt,
							fontSize: '14px',
							fontWeight: 'bold',
							padding: '10px 20px',
							':hover': {
								backgroundColor: 'none',
							},
						}}
					>
						<SaveAltOutlined sx={{ mr: '10px' }} />
						Save
					</Button>
				</Box>
			</form>
			{loading && <CircularProgress />}
		</>
	);
};

export default ModuleForm;
