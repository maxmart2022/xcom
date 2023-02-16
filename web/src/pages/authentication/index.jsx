import { Box, Button, Typography, useTheme } from '@mui/material';
import { HomeOutlined } from '@mui/icons-material';
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import ThemeToggler from 'components/ThemeToggler';
import LoginForm from 'forms/LoginForm';

const Form = () => {
	const theme = useTheme();

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

				<LoginForm />

				<Box mt='20px'>
					<Button>Forgot Password?</Button>
				</Box>
			</FlexBetween>
		</Box>
	);
};

export default Form;
