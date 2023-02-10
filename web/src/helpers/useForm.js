import { useState } from "react";

const useForm = (initialValues, validationSchema) => {
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

  // const handleChange = async (event) => {
  //   event.persist();
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  //   console.log(values);
  //   validate();
  // };

  const handleChange = async (event) => {
    event.persist();
    setValues((prevValues) => {
      const updatedValues = { ...prevValues };
      const value = prevValues[event.target.name];
      if (Array.isArray(value)) {
        const index = value.findIndex((val) => val.name === event.target.name);
        if (index !== -1) {
          value[index].value = event.target.value;
        } else {
          value.push({
            name: event.target.name,
            value: event.target.value,
          });
        }
        updatedValues[event.target.name] = value;
      } else {
        updatedValues[event.target.name] = event.target.value;
      }
      return updatedValues;
    });

    console.log(values);
    validate();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await validate()) {
      console.log(values);
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
