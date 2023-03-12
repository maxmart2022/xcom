import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import BrandForm from 'forms/BrandForm';

const NewBrand = () => {
	return (
		<Box m='1.5rem 2.5rem'>
			<Header title='Brand Form' subtitle='Create Brand' />
			<Box>
				<BrandForm />
			</Box>
		</Box>
	);
};

export default NewBrand;
