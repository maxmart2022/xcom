import * as yup from 'yup';

const moduleSchema = yup.object().shape({
	name: yup.string().required('Name Required'),
	actions: yup.array().min(1, 'At least one action is required').required(),
});

export default moduleSchema;
