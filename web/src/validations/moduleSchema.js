import * as yup from 'yup';

const moduleSchema = yup.object().shape({
	name: yup.string().required('Name Required'),
	actions: yup.array().optional(),
});

export default moduleSchema;
