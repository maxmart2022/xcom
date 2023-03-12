import * as yup from 'yup';

const brandSchema = yup.object().shape({
	name: yup.string().required('Brand Name Required'),
	brandOwner: yup.string().required('Brand Owner Required'),
	parent: yup.string(),
});

export default brandSchema;
