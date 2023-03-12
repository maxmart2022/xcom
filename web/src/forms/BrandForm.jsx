import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Box,
	Button,
	useTheme,
	Stack,
	FormControl,
	InputLabel,
	TextField,
	CircularProgress,
	Alert,
	Select,
	MenuItem,
} from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import brandSchema from 'validations/brandSchema';
import useForm from 'hooks/useForm';
import useApi from 'hooks/useApi';

const BrandForm = () => {
	const theme = useTheme();
	const initialValues = useMemo(
		() => ({ name: '', brandOwner: '', parent: '' }),
		[]
	);
	const [brands, setBrands] = useState([]);
	const [defaultBrands, setDefaultBrands] = useState([]);
	const navigate = useNavigate();
	const { id } = useParams();

	const { loading, error, fetchData, postData, putData } = useApi();

	useEffect(() => {
		const getBrands = async () => {
			const response = await fetchData('brand/list');
			setBrands(response);
		};
		getBrands();
	}, []);

	const doSubmit = async (payload) => {
		let responseData;
		try {
			if (id === 'new') {
				responseData = await postData('brand/new', payload);
			} else {
				responseData = await putData(`brand/update/${id}`, payload);
			}
			if (responseData) {
				navigate('/brands');
			}
		} catch (err) {
			console.error(err);
		}
	};
	const { values, setValues, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		brandSchema,
		doSubmit
	);

	useEffect(() => {
		const getBrandForm = async () => {
			if (id === 'new') {
				return;
			}
			try {
				const response = await fetchData(`brand/view/${id}`);
				const parent = response.parent !== '' ? response.parent?.id : '';
				setValues({
					name: response.name,
					brandOwner: response.brandOwner,
					parent,
				});
				const filteredBrands = brands.filter((brand) => {
					return brand.id === parent;
				});
				setDefaultBrands(filteredBrands);
			} catch (err) {
				console.error(err);
			}
		};
		getBrandForm();
	}, [id, brands]);

	console.log(brands);

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
						type='text'
						variant='outlined'
						placeholder='Brand Name'
						name='name'
						label='Brand name'
						autoFocus
						value={values.name || ''}
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
					/>
					<TextField
						type='text'
						variant='outlined'
						placeholder='Brand Owner'
						name='brandOwner'
						label='Brand owner'
						value={values.brandOwner || ''}
						onChange={handleChange}
						error={!!errors.brandOwner}
						helperText={errors.brandOwner}
					/>
					{brands.length > 0 && (
						<FormControl sx={{ width: '100%' }}>
							<InputLabel id='parent-brand-label'>Parent Brand</InputLabel>
							<Select
								labelId='parent-brand-label'
								id='parent-brand'
								label='Parent Brand'
								name='parent'
								value={values.parent || ''}
								onChange={handleChange}
							>
								<MenuItem value=''>None</MenuItem>
								{brands.map((brand) => (
									<MenuItem key={brand.id} value={brand.id}>
										{brand.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
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

export default BrandForm;
