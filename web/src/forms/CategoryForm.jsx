import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Box,
	Button,
	useTheme,
	Stack,
	Checkbox,
	TextField,
	CircularProgress,
	Alert,
	Autocomplete,
} from '@mui/material';
import {
	SaveOutlined,
	CheckBoxOutlineBlank,
	CheckBox,
} from '@mui/icons-material';
import categorySchema from 'validations/categorySchema';
import useForm from 'hooks/useForm';
import useApi from 'hooks/useApi';

const CategoryForm = () => {
	const theme = useTheme();
	const initialValues = useMemo(() => ({ name: '', parent: [] }), []);
	const [categories, setCategories] = useState([]);
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
		let responseData;
		try {
			if (id === 'new') {
				responseData = await postData('category/new', payload);
			} else {
				responseData = await putData(`category/update/${id}`, payload);
			}
			if (responseData) {
				navigate('/categories');
			}
		} catch (err) {
			console.error(err);
		}
	};
	const { values, setValues, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		categorySchema,
		doSubmit
	);

	useEffect(() => {
		const getCategoryForm = async () => {
			if (id === 'new') {
				return;
			}
			try {
				const response = await fetchData(`category/view/${id}`);
				const parent = response.parent.map(
					(parentCategory) => parentCategory.id
				);
				setValues({
					name: response.name,
					parent,
				});
			} catch (err) {
				console.error(err);
			}
		};
		getCategoryForm();
	}, []);

	const defaultCategoryValues = categories?.filter((category) =>
		values?.parent?.includes(category.id)
	);

	console.log(values);

	console.log(defaultCategoryValues);

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
						type='name'
						variant='outlined'
						placeholder='Category Name'
						name='name'
						label='Category name'
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
							defaultValue={defaultCategoryValues}
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
									label='Parent Category'
									placeholder='Choose Parent Categories'
								/>
							)}
							onChange={(event, value) => {
								const categoryId = value.map((category) => category.id);
								handleChange({
									target: { name: 'parent', value: categoryId },
								});
							}}
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

export default CategoryForm;
