import * as yup from 'yup';

const permissionSchema = yup.object().shape({
	permissions: yup
		.array()
		.min(1, 'At least one module action is required')
		.required(),
});

export default permissionSchema;
