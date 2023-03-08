import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, useTheme } from '@mui/material';
import {
	TextField,
	FormGroup,
	FormControlLabel,
	Checkbox,
	CircularProgress,
	Alert,
} from '@mui/material';
import { VpnKeyOutlined } from '@mui/icons-material';
import loginSchema from 'validations/login';
import useForm from 'hooks/useForm';
import useAuth from 'hooks/useAuth';
import { axiosPrivate } from 'api/axios';
import useToggle from 'hooks/useToggle';

const LoginForm = () => {
	const theme = useTheme();
	const initialValues = { email: '', password: '' };
	const { setAuth } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [check, toggleCheck] = useToggle('persist', false);

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/dashboard';

	const doSubmit = async (payload) => {
		try {
			setLoading(true);
			const responseData = await axiosPrivate.post('auth/signin', payload);
			setAuth({
				accessToken: responseData?.data?.access_token,
				expiresAt: responseData?.data?.expiresAt,
			});
			navigate(from, { replace: true });
		} catch (err) {
			if (err.response && err.response.data && err.response.data.errors) {
				setError(err.response.data.errors[0].message);
			} else {
				setError('Something unexepected !!!');
			}
		} finally {
			setLoading(false);
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
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								onChange={toggleCheck}
								checked={check}
								sx={{
									color: theme.palette.secondary[300],
								}}
							/>
						}
						label='Trust this device'
					/>
				</FormGroup>

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
