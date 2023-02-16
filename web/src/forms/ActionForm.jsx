import React from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { TextField, CircularProgress, Alert } from '@mui/material';
import { SaveAltOutlined } from '@mui/icons-material';
import useActionService from 'services/actionService';
import actionSchema from 'validations/actionSchema';
import useForm from 'hooks/use-form';

const ActionForm = () => {
	const theme = useTheme();
	const initialValues = { name: '' };

	const { newAction, loading, error } = useActionService();

	const doSubmit = async (payload) => {
		const responseData = await newAction(payload);
	};
	const { values, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		actionSchema,
		doSubmit
	);
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

export default ActionForm;
