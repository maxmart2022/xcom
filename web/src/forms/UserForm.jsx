import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, useTheme, Stack } from '@mui/material';
import { TextField, CircularProgress, Alert } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import userSchema from 'validations/userSchema';
import useForm from 'hooks/useForm';
import useApi from 'hooks/useApi';

const UserForm = () => {
	const theme = useTheme();
	const initialValues = useMemo(
		() => ({ email: '', password: '', role: 'Admin' }),
		[]
	);
	const navigate = useNavigate();
	const { id: userId } = useParams();

	const { loading, error, fetchData, postData, putData, setError } = useApi();

	const doSubmit = async (payload) => {
		let responseData;
		try {
			if (userId === 'new') {
				responseData = await postData('auth/signup', payload);
			} else {
				responseData = await putData(`auth/update/${userId}`, payload);
			}
			if (responseData) {
				navigate('/users');
			}
		} catch (err) {
			console.error(err);
		}
	};
	const { values, setValues, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		userSchema,
		doSubmit
	);

	useEffect(() => {
		const getUserForm = async () => {
			if (userId === 'new') {
				return;
			}
			try {
				const response = await fetchData(`auth/view/${userId}`);
				setValues({
					email: response.email,
					role: 'Admin',
				});
			} catch (err) {
				console.error(err);
			}
		};
		getUserForm();
	}, []);

	return (
		<>
			<form style={{ display: 'contents' }} onSubmit={handleSubmit}>
				<Stack
					spacing={2}
					sx={{
						width: '40ch',
					}}
				>
					<TextField
						type='email'
						variant='outlined'
						placeholder='Email'
						name='email'
						label='Email'
						autoFocus
						value={values.email || ''}
						onChange={handleChange}
						error={!!errors.email}
						helperText={errors.email}
					/>
					{userId === 'new' && (
						<TextField
							type='password'
							label='Password'
							variant='outlined'
							placeholder='Password'
							name='password'
							value={values.password || ''}
							onChange={handleChange}
							error={!!errors.password}
							helperText={errors.password}
						/>
					)}
				</Stack>

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
		</>
	);
};

export default UserForm;
