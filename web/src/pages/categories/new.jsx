import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import CategoryForm from 'forms/CategoryForm';

const NewCateogry = () => {
	return (
		<Box m='1.5rem 2.5rem'>
			<Header title='Category Form' subtitle='Create category' />
			<Box>
				<CategoryForm />
			</Box>
		</Box>
	);
};

export default NewCateogry;
