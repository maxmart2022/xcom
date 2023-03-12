import * as yup from 'yup';

const variantSchema = yup.object().shape({
	name: yup.string().required('Variant Name Required'),
	values: yup
		.array()
		.of(
			yup
				.string()
				.required('Value field cannot be empty. Delete it if not needed')
		)
		.min(1, 'At least one variant value is required')
		.required('Variant values are required')
		.test('no-duplicates', 'Duplicate values are not allowed', (values) => {
			if (!values) return true;
			const uniqueValues = new Set(values);
			return uniqueValues.size === values.length;
		})
		.test('no-empty-variant', 'Empty variant are not allowed', (values) => {
			if (!values) return true;
			return values.every((val) => val.trim() !== '');
		}),
});

export default variantSchema;
