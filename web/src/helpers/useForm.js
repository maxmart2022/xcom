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
      if (typeof value === "string") {
        updatedValues[event.target.name] = event.target.value;
      } else if (Array.isArray(value)) {
        value.push(event.target.value);
        updatedValues[event.target.name] = value;
      } else if (typeof value === "object") {
        updatedValues[event.target.name] = {
          ...value,
          [event.target.name]: event.target.value,
        };
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
