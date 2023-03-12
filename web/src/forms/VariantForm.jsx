import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Box,
	Button,
	useTheme,
	Stack,
	TextField,
	CircularProgress,
	Alert,
	Checkbox,
	Autocomplete,
} from '@mui/material';
import {
	Add,
	Delete,
	SaveOutlined,
	CheckBoxOutlineBlank,
	CheckBox,
} from '@mui/icons-material';
import variantSchema from 'validations/variantSchema';
import useForm from 'hooks/useForm';
import useApi from 'hooks/useApi';

const VariantForm = () => {
	const theme = useTheme();
	const initialValues = useMemo(
		() => ({ name: '', categories: [], values: [''] }),
		[]
	);
	const [categories, setCategories] = useState([]);
	const [defaultCategories, setDefaultCategories] = useState([]);
	const [fieldErrors, setFieldErrors] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();

	const icon = <CheckBoxOutlineBlank fontSize='small' />;
	const checkedIcon = <CheckBox fontSize='small' />;

	const { loading, error, fetchData, postData, putData } = useApi();

	useEffect(() => {
		const getCategories = async () => {
			const response = await fetchData('category/list');
			setCategories(response);
		};
		getCategories();
	}, []);

	const doSubmit = async (payload) => {
		payload.values.map((variantValue) => {
			if (variantValue === '') {
				setFieldErrors(
					'Variant values cannot be empty. If you have finished adding, delete the unnecessary fileds'
				);
			}
		});
		let responseData;
		try {
			if (id === 'new') {
				responseData = await postData('variant/new', payload);
			} else {
				responseData = await putData(`variant/update/${id}`, payload);
			}
			if (responseData) {
				navigate('/variants');
			}
		} catch (err) {
			console.error(err);
		}
	};
	const { values, setValues, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		variantSchema,
		doSubmit
	);

	useEffect(() => {
		const getVariantForm = async () => {
			if (id === 'new') {
				return;
			}
			try {
				const response = await fetchData(`variant/view/${id}`);
				const variantCategories = response.categories.map(
					(category) => category.id
				);
				console.log(variantCategories);
				setValues({
					name: response.name,
					categories: variantCategories,
					values: response.values,
				});
				const filteredCategory = categories.filter((category) => {
					return variantCategories.some((item) => item === category.id);
				});
				console.log(filteredCategory);
				setDefaultCategories(filteredCategory);
			} catch (err) {
				console.error(err);
			}
		};
		getVariantForm();
	}, [id, categories]);

	const handleAddField = () => {
		setValues({
			...values,
			values: [...values.values, ''],
		});
	};

	const handleDeleteField = (index) => {
		setValues((values) => ({
			...values,
			values: values.values.filter((variantValue, i) => i !== index),
		}));
	};

	return (
		<>
			<form style={{ display: 'contents' }} onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<TextField
						type='text'
						variant='outlined'
						placeholder='Variant Name'
						name='name'
						label='Variant name'
						autoFocus
						value={values.name || ''}
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
					/>
					{categories.length > 0 && (
						<Autocomplete
							multiple
							options={categories}
							getOptionLabel={(category) => category.name}
							value={defaultCategories || []}
							disableCloseOnSelect
							renderOption={(props, category, { selected }) => (
								<li {...props}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
									/>
									{category.name}
								</li>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Category'
									placeholder='Choose Categories'
								/>
							)}
							onChange={(event, value) => {
								setDefaultCategories(value);
								const categoryId = value.map((category) => category.id);
								handleChange({
									target: { name: 'categories', value: categoryId },
								});
							}}
						/>
					)}
					{values.values.map((variantValue, index) => {
						return (
							<Stack direction='row' spacing={2} key={index}>
								<TextField
									type='text'
									name={`values${index}`}
									variant='outlined'
									placeholder='Variant Value'
									label='Variant Value'
									value={variantValue || ''}
									onChange={(e) => {
										handleChange(
											{
												target: { name: 'values', value: e.target.value },
											},
											index
										);
									}}
									error={!!errors.values}
									helperText={errors.values}
								/>
								<Stack direction='row' sx={{ '& button': { m: 1 } }}>
									<Button
										size='small'
										sx={{
											backgroundColor: theme.palette.secondary[300],
											color: theme.palette.background.alt,
										}}
										onClick={handleAddField}
									>
										<Add />
									</Button>
									{values.values.length > 1 && (
										<Button
											size='small'
											sx={{
												backgroundColor: theme.palette.secondary[300],
												color: theme.palette.background.alt,
											}}
											onClick={() => handleDeleteField(index)}
										>
											<Delete />
										</Button>
									)}
								</Stack>
							</Stack>
						);
					})}
				</Stack>

				{error && <Alert severity='error'>{JSON.stringify(error)}</Alert>}
				{fieldErrors && (
					<Alert severity='error'>{JSON.stringify(fieldErrors)}</Alert>
				)}
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

export default VariantForm;
