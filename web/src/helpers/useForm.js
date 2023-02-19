import { useState } from "react";
import axios from "axios";

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

  const handleChange = async (event) => {
    event.persist();
    const { name, value } = event.target;
    setValues((values) => {
      return { ...values, [name]: value };
    });
    console.log(values);
    validate();
  };

  const handleArrayChange = (index, propertyName) => (e) => {
    const newPropertyValues = [...values[propertyName]];
    newPropertyValues[index] = e.target.value;
    setValues({ ...values, [propertyName]: newPropertyValues });
    console.log(values);
  };

  const handleSubmit = async (event, url, callback) => {
    event.preventDefault();
    if (await validate()) {
      try {
        const response = await axios.post(url, values);
        console.log(response.data);
        console.log(values);
        setValues(initialValues);
        callback(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
    handleArrayChange,
    errors,
  };
};

export default useForm;
