import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import ProductForm from 'forms/ProductForm';

const NewProduct = () => {
	return (
		<Box m='1.5rem 2.5rem'>
			<Header title='Product Form' subtitle='Create Product' />
			<Box>
				<ProductForm />
			</Box>
		</Box>
	);
};

export default NewProduct;
