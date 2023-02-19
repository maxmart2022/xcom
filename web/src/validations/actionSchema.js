import * as yup from 'yup';

const actionSchema = yup.object().shape({
	name: yup.string().required('Name Required'),
});

export default actionSchema;
