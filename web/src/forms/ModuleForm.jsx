import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, useTheme, Stack } from '@mui/material';
import {
	TextField,
	FormGroup,
	FormControlLabel,
	Checkbox,
	CircularProgress,
	Alert,
	FormHelperText,
} from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import moduleSchema from 'validations/moduleSchema';
import useForm from 'hooks/useForm';
import useApi from 'hooks/useApi';

const ModuleForm = ({ onAddModule, moduleId, setModuleId }) => {
	const theme = useTheme();
	const initialValues = useMemo(() => ({ name: '', actions: [] }), []);

	const [actions, setActions] = useState(null);

	const { loading, error, fetchData, postData, putData, setError } = useApi();

	useEffect(() => {
		const getActions = async () => {
			try {
				const response = await fetchData('action/list');
				setActions(response);
			} catch (err) {
				console.error(err);
			}
		};
		getActions();
	}, [onAddModule]);

	const doSubmit = async (payload) => {
		let responseData;
		if (moduleId) {
			if (
				window.confirm(
					'Do you really want to proceed with this edit? Hope you are not adding new one.'
				)
			) {
				responseData = await putData(`module/update/${moduleId}`, payload);
			} else {
				setValues(values);
			}
		} else {
			responseData = await postData('module/new', payload);
			setValues(initialValues);
		}
		if (responseData) {
			onAddModule();
			setError(null);
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

	useEffect(() => {
		async function getModuleForm() {
			if (!moduleId) {
				return;
			}
			try {
				const response = await fetchData(`module/view/${moduleId}`);
				setValues({
					name: response.name,
					actions: response.actions.map((action) => action),
				});
			} catch (err) {
				console.error(err);
			}
		}
		getModuleForm();
	}, [moduleId, setValues]);

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
				{loading ? (
					<CircularProgress />
				) : (
					<FormGroup>
						{actions &&
							actions.map((action) => (
								<FormControlLabel
									key={action._id}
									control={
										<Checkbox
											name='actions'
											value={action._id || ''}
											checked={
												values.actions && values.actions.includes(action._id)
											}
											onChange={handleCheckboxChange}
											color='secondary'
										/>
									}
									label={action.name}
								/>
							))}
						{errors.actions && (
							<FormHelperText error>{errors.actions}</FormHelperText>
						)}
					</FormGroup>
				)}
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
								':hover': {
									backgroundColor: 'transparent',
								},
							}}
						>
							<SaveOutlined sx={{ mr: '10px' }} />
							{moduleId ? 'Update' : 'Save'}
						</Button>
						{moduleId && (
							<Button
								m='normal'
								onClick={() => {
									setValues(initialValues);
									setError(null);
									setModuleId(null);
								}}
								color='success'
								variant='outlined'
							>
								Cancel
							</Button>
						)}
					</Stack>
				</Box>
			</form>
			{loading && <CircularProgress />}
		</>
	);
};

export default ModuleForm;
