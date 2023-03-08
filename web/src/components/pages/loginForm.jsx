import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import useForm from "../../helpers/useForm";
import { MyInput, MyButton, MyForm } from "../common/ReusableComponents";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const urlEndPoint = "https://xcom.dev/api/superman/users/signin";

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const { values, handleChange, handleSubmit, errors } = useForm(
    initialValues,
    validationSchema
  );

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(urlEndPoint, values);
      console.log(response.data);
      setIsLoading(false);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <MyForm>
      <form style={formStyles.form} onSubmit={handleSubmit}>
        <div>
          <MyInput
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            style={formStyles.input}
          />
          {errors.email && <p style={formStyles.error}>{errors.email}</p>}
        </div>
        <div>
          <MyInput
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            style={formStyles.input}
          />
          {errors.password && <p style={formStyles.error}>{errors.password}</p>}
        </div>
        <MyButton
          onClick={handleLogin}
          disabled={isLoading}
          style={formStyles.button}
        >
          Submit
        </MyButton>
      </form>
    </MyForm>
  );
};

export default LoginForm;

const formStyles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    margin: "0.5rem 0",
  },
};
