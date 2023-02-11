import {
	Box,
	Button,
	TextField,
	Typography,
	useTheme,
	CircularProgress,
	Alert,
} from '@mui/material';
import { VpnKeyOutlined, HomeOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import ThemeToggler from 'components/ThemeToggler';
import loginSchema from 'validations/login';
import useForm from 'hooks/use-form';
import useAuthService from 'services/authService';

const Form = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const initialValues = { email: '', password: '' };
	const { login, loading, error } = useAuthService();

	const doSubmit = async (payload) => {
		const data = await login(payload);
		if (data.access_token) {
			localStorage.setItem(data);
			navigate('/dashboard');
		}
	};
	const { values, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		loginSchema,
		doSubmit
	);

	return (
		<Box m='1.5rem 2.5rem'>
			<FlexBetween>
				<Header title='MAXMART' subtitle='Administration Login' />
				<Box>
					<ThemeToggler />
					<Button
						sx={{
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.background.alt,
							fontSize: '14px',
							fontWeight: 'bold',
							padding: '10px 20px',
						}}
					>
						<HomeOutlined sx={{ mr: '10px' }} /> HOME
					</Button>
				</Box>
			</FlexBetween>
			<FlexBetween
				flexDirection={'column'}
				maxWidth={400}
				borderRadius={5}
				m='auto'
				p='3rem'
				boxShadow='10px 10px 10px #ccc'
				sx={{
					':hover': {
						boxShadow: '10px 10px 20px #ccc',
					},
				}}
			>
				<Typography variant='h3' fontWeight='bold'>
					LOGIN
				</Typography>
				<form style={{ display: 'contents' }} onSubmit={handleSubmit}>
					<TextField
						type={'email'}
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
					{error && (
						<Alert severity='error'>
							{error.message ? error.message : JSON.stringify(error)}
						</Alert>
					)}
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
				<Box mt='20px'>
					<Button>Forgot Password?</Button>
				</Box>
			</FlexBetween>
		</Box>
	);
};

export default Form;
