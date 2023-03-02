import * as yup from 'yup';

const categorySchema = yup.object().shape({
	name: yup.string().required('Category Name Required'),
	parent: yup.array(),
});

export default categorySchema;
