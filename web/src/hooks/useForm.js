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

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues((prevValues) => {
			// if (Array.isArray(prevValues[name])) {
			// 	console.log(value);
			// 	return {
			// 		...prevValues,
			// 		[name]: [...prevValues[name], value],
			// 	};
			// } else {
			return {
				...prevValues,
				[name]: value,
			};
			// }
		});
		validate();
	};

	const handleCheckboxChange = (event) => {
		// event.persist();
		const { name, checked, value } = event.target;
		setValues((prevValues) => {
			if (checked) {
				if (Array.isArray(prevValues[name])) {
					return {
						...prevValues,
						[name]: [...prevValues[name], value],
					};
				} else {
					return {
						...prevValues,
						[name]: value,
					};
				}
			} else {
				return {
					...prevValues,
					[name]: [
						...prevValues[name].filter((prevValue) => prevValue !== value),
					],
				};
			}
		});
		validate();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (await validate()) {
			doSubmit(values);
		}
	};

	return {
		values,
		setValues,
		handleChange,
		handleCheckboxChange,
		handleSubmit,
		errors,
	};
};

export default useForm;
