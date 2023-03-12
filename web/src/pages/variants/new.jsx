import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import VariantForm from 'forms/VariantForm';

const NewVariant = () => {
	return (
		<Box m='1.5rem 2.5rem'>
			<Header title='Variant Form' subtitle='Create Variant' />
			<Box>
				<VariantForm />
			</Box>
		</Box>
	);
};

export default NewVariant;
