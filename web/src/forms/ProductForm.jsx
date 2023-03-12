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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Chip,
	ListItemText,
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

const ProductForm = () => {
	const theme = useTheme();
	const initialValues = useMemo(
		() => ({
			name: '',
			description: '',
			categories: [],
			brand: '',
			productImages: [],
			variants: [{ name: '', values: [] }],
		}),
		[]
	);
	const [categories, setCategories] = useState([]);
	const [defaultCategories, setDefaultCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [variants, setVariants] = useState([]);
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

	useEffect(() => {
		const getBrands = async () => {
			const response = await fetchData('brand/list');
			setBrands(response);
		};
		getBrands();
	}, []);

	useEffect(() => {
		const getVariants = async () => {
			const response = await fetchData('variant/list');
			setVariants(response);
		};
		getVariants();
	}, []);

	const doSubmit = async (payload) => {
		let responseData;
		try {
			if (id === 'new') {
				responseData = await postData('product/new', payload);
			} else {
				responseData = await putData(`product/update/${id}`, payload);
			}
			if (responseData) {
				navigate('/products');
			}
		} catch (err) {
			console.error(err);
		}
	};
	const {
		values,
		setValues,
		handleChange,
		handleFileChange,
		handleSubmit,
		errors,
	} = useForm(initialValues, variantSchema, doSubmit);

	useEffect(() => {
		const getProductForm = async () => {
			if (id === 'new') {
				return;
			}
			try {
				const response = await fetchData(`product/view/${id}`);
				const productCategories = response.categories.map(
					(category) => category.id
				);
				setValues({
					name: response.name,
					description: response.description,
					categories: productCategories,
					brand: response.brand,
					images: response.images,
					variants: response.variants,
				});
				const filteredCategory = categories.filter((category) => {
					return productCategories.some((item) => item === category.id);
				});
				setDefaultCategories(filteredCategory);
			} catch (err) {
				console.error(err);
			}
		};
		getProductForm();
	}, [id, categories, brands, variants]);

	const handleAddField = () => {
		setValues({
			...values,
			variants: [...values.variants, { name: '', values: [] }],
		});
	};

	const handleDeleteField = (index) => {
		setValues((values) => ({
			...values,
			variants: values.variants.filter((variantValue, i) => i !== index),
		}));
	};

	const handleVariantNameChange = (event, index) => {
		const newVariants = [...values.variants];
		const variantName = event.target.value;
		const selectedVariantOptionValues =
			variants.find((option) => option.name === variantName)?.values || [];
		newVariants[index] = {
			name: variantName,
			values: selectedVariantOptionValues.map((option) => option),
		};
		setValues({
			...values,
			variants: newVariants,
		});
	};

	const handleVariantValueChange = (event, index) => {
		const newVariants = [...values.variants];
		newVariants[index].values = event.target.value;
		setValues({ ...values, variants: newVariants });
	};

	const getVariantOptionValues = (variantName) => {
		const selectedVariant = variants.find(
			(option) => option.name === variantName
		);
		return selectedVariant ? selectedVariant.values : [];
	};

	return (
		<>
			<form style={{ display: 'contents' }} onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<TextField
						type='text'
						variant='outlined'
						placeholder='Product Name'
						name='name'
						label='Product name'
						autoFocus
						value={values.name || ''}
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
					/>
					<TextField
						type='text'
						variant='outlined'
						placeholder='Product Description'
						name='description'
						label='Product description'
						value={values.description || ''}
						fullWidth
						required
						multiline
						rows={4}
						onChange={handleChange}
						error={!!errors.description}
						helperText={errors.description}
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
					{brands.length > 0 && (
						<FormControl sx={{ width: '100%' }}>
							<InputLabel id='brand-label'>Brand</InputLabel>
							<Select
								labelId='brand-label'
								id='brand'
								label='Brand'
								name='brand'
								value={values.brand || ''}
								onChange={handleChange}
							>
								{brands.map((brand) => (
									<MenuItem key={brand.id} value={brand.id}>
										{brand.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}

					<Button
						variant='contained'
						color='secondary'
						component='label'
						sx={{
							color: theme.palette.background.alt,
							fontSize: '12px',
							fontWeight: 'bold',
						}}
					>
						Upload
						<input
							hidden
							type='file'
							accept='image/*'
							name='productImages'
							multiple
							onChange={handleFileChange}
						/>
					</Button>

					{values.productImages.map((image, index) => (
						<Box
							key={index}
							display='inline-block'
							position='relative'
							marginLeft='0.5rem'
						>
							<img src={image} alt='' width='100' height='100' />
							<Button
								size='small'
								onClick={() => {
									const newImages = [...values.productImages];
									newImages.splice(index, 1);
									setValues({ ...values, productImages: newImages });
								}}
								style={{ position: 'absolute', top: 0, right: 0 }}
							>
								<Delete />
							</Button>
						</Box>
					))}

					{values.variants.map((variant, index) => (
						<Box key={index} marginBottom='1rem'>
							<Typography variant='h6'>Variant {index + 1}</Typography>

							<Box display='flex' alignItems='center' marginBottom='0.5rem'>
								<Box marginRight='1rem'>
									<InputLabel id='variant-label'>Choose Variant</InputLabel>
									<Select
										label='Variant Name'
										variant='outlined'
										name='variants'
										fullWidth
										required
										value={variant.name}
										onChange={(event) => handleVariantNameChange(event, index)}
									>
										{variants.map((option) => (
											<MenuItem key={option.id} value={option.name}>
												{option.name}
											</MenuItem>
										))}
									</Select>
								</Box>

								<Box marginRight='1rem'>
									<InputLabel id='variant-label'>
										Choose Variant Value
									</InputLabel>
									<Select
										label='Choose Variant Value'
										variant='outlined'
										fullWidth
										required
										multiple
										value={variant.values}
										renderValue={(selected) => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selected.map((value) => (
													<Chip key={value} label={value} />
												))}
											</Box>
										)}
										onChange={(event) => handleVariantValueChange(event, index)}
									>
										{getVariantOptionValues(variant.name).map((option) => (
											<MenuItem key={option.id} value={option.optionValue}>
												<Checkbox
													checked={
														variant.values.indexOf(option.optionValue) > -1
													}
												/>
												<ListItemText primary={option.optionValue} />
											</MenuItem>
										))}
									</Select>
								</Box>

								<Box>
									<Button
										onClick={() => handleDeleteField(index)}
										color='error'
										variant='contained'
									>
										<Delete />
									</Button>
								</Box>
							</Box>
						</Box>
					))}
				</Stack>

				{error && <Alert severity='error'>{JSON.stringify(error)}</Alert>}
				<Box mt='20px'>
					<Stack spacing={2} direction='row'>
						{variants.length > values.variants.length && (
							<Button
								onClick={handleAddField}
								variant='outlined'
								color='secondary'
							>
								Add Variant
							</Button>
						)}
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

export default ProductForm;
