import React, { useMemo } from 'react';
import { Box, Button, useTheme, Stack } from '@mui/material';
import { TextField, CircularProgress, Alert } from '@mui/material';
import { SaveAltOutlined } from '@mui/icons-material';
import actionSchema from 'validations/actionSchema';
import useForm from 'hooks/useForm';
import useApi from 'hooks/useApi';

const ActionForm = ({ onAddAction, actionId, setActionId }) => {
	const theme = useTheme();
	const initialValues = useMemo(() => ({ name: '' }), []);

	const { loading, error, fetchData, postData, putData, setError } = useApi();

	const doSubmit = async (payload) => {
		let responseData;
		if (actionId) {
			if (
				window.confirm(
					'Do you really want to proceed with this edit? Hope you are not adding new one.'
				)
			) {
				responseData = await putData(`action/update/${actionId}`, payload);
				setActionId(null);
				setValues(initialValues);
			} else {
				setValues(values);
			}
		} else {
			responseData = await postData('action/new', payload);
			setValues(initialValues);
		}
		if (responseData) {
			onAddAction();
			setError(null);
		}
	};
	const { values, setValues, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		actionSchema,
		doSubmit
	);

	React.useEffect(() => {
		async function getActionForm() {
			if (!actionId) {
				return;
			}
			try {
				const response = await fetchData(`action/view/${actionId}`);
				setValues({
					name: response.name,
				});
			} catch (err) {
				console.error(err);
			}
		}
		getActionForm();
	}, [actionId, setValues]);
	return (
		<>
			<form style={{ display: 'contents' }} onSubmit={handleSubmit}>
				<TextField
					type='text'
					variant='outlined'
					placeholder='Action Name'
					name='name'
					label='Name'
					autoFocus
					margin='normal'
					value={values.name || ''}
					onChange={handleChange}
					error={!!errors.name}
					helperText={errors.name}
				/>
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
									backgroundColor: 'none',
								},
							}}
						>
							<SaveAltOutlined sx={{ mr: '10px' }} />
							{actionId ? 'Update' : 'Save'}
						</Button>
						{actionId && (
							<Button
								m='normal'
								onClick={() => {
									setValues(initialValues);
									setActionId(null);
									setError(null);
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

export default ActionForm;
