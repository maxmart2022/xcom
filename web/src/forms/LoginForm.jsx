import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useTheme } from '@mui/material';
import { TextField, CircularProgress, Alert } from '@mui/material';
import { VpnKeyOutlined } from '@mui/icons-material';
import loginSchema from 'validations/login';
import useForm from 'hooks/use-form';
import useAuthService from 'services/authService';

const LoginForm = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const initialValues = { email: '', password: '' };

	const { login, loading, error } = useAuthService();

	const doSubmit = async (payload) => {
		const responseData = await login(payload);
		if (responseData) {
			localStorage.setItem(
				'accessToken',
				JSON.stringify({
					value: responseData.access_token,
					expiresAt: responseData.expiresAt,
				})
			);
			localStorage.setItem('refreshToken', responseData.refresh_token);
			navigate('/dashboard');
		}
	};
	const { values, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		loginSchema,
		doSubmit
	);
	return (
		<>
			<form style={{ display: 'contents' }} onSubmit={handleSubmit}>
				<TextField
					type='email'
					variant='outlined'
					placeholder='Email'
					name='email'
					label='Email'
					autoFocus
					margin='normal'
					value={values.email || ''}
					onChange={handleChange}
					error={!!errors.email}
					helperText={errors.email}
				/>
				<TextField
					type='password'
					label='Password'
					variant='outlined'
					placeholder='Password'
					name='password'
					margin='normal'
					value={values.password || ''}
					onChange={handleChange}
					error={!!errors.password}
					helperText={errors.password}
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
						<VpnKeyOutlined sx={{ mr: '10px' }} />
						Login
					</Button>
				</Box>
			</form>
			{loading && <CircularProgress />}
		</>
	);
};

export default LoginForm;
