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

	//   validate property
	const validateProperty = async (name) => {
		try {
			await validationSchema.validateAt(name, values);
			setErrors({});
			return true;
		} catch (err) {
			const newErrors = {};
			newErrors[name] = err.errors[0];
			setErrors(newErrors);
			return false;
		}
	};

	// if (Array.isArray(prevValues[name])) {
	// 	return {
	// 		...prevValues,
	// 		[name]: [...prevValues[name], value],
	// 	};
	// } else {
	// }

	const handleChange = (event, index) => {
		const { name, value } = event.target;
		if (index >= 0) {
			const newArrayValue = [...values[name]];
			newArrayValue[index] = value;
			setValues({ ...values, [name]: newArrayValue });
		} else {
			setValues((prevValues) => {
				return {
					...prevValues,
					[name]: value,
				};
			});
		}
		validateProperty(name);
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

	const handleFileChange = (event) => {
		const { name, files } = event.target;
		const fileArray = [];

		for (let i = 0; i < files.length; i++) {
			const fileURL = URL.createObjectURL(files[i]);
			fileArray.push(fileURL);
		}

		setValues({
			...values,
			[name]: fileArray,
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
		setValues,
		handleChange,
		handleCheckboxChange,
		handleFileChange,
		handleSubmit,
		errors,
	};
};

export default useForm;
