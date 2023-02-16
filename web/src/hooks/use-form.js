import { useState } from 'react';

const useForm = (initialValues, validationSchema, doSubmit) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	const validate = async () => {
		try {
			await validationSchema.validate(values, { abortEarly: false });
			setErrors({});
			return true;
		} catch (err) {
			const newErrors = {};
			err.inner.forEach((error) => {
				newErrors[error.path] = error.message;
			});
			setErrors(newErrors);
			return false;
		}
	};

	const handleChange = async (event) => {
		event.persist();
		validate();
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (await validate()) {
			doSubmit(values);
		}
	};

	return {
		values,
		handleChange,
		handleSubmit,
		errors,
	};
};

export default useForm;
