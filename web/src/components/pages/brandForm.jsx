import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import useForm from "../../helpers/useForm";
import { MyInput, MyButton } from "../common/ReusableComponents";

const BrandForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [parent, setParent] = useState(false);
  const [subbrand, setSubbrand] = useState(false);
  const [subbrandFields, setSubbrandFields] = useState([{ id: 1 }]);
  const categories = [
    { id: 1, name: "mobile phones" },
    { id: 2, name: "laptops" },
    { id: 3, name: "headphones" },
    { id: 4, name: "tablets" },
  ];

  const navigate = useNavigate();
  const urlEndPoint = "https://xcom.dev/api/brand/new";

  const initialValues = {
    name: "",
    parent: false,
    subbrand: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
  });

  function handleParentChange(event) {
    setParent(event.target.checked);
  }

  function handleSubbrandChange(event) {
    setSubbrand(event.target.checked);
  }

  function handleSubbrandAddField() {
    setSubbrandFields([...subbrandFields, { id: subbrandFields.length + 1 }]);
  }

  function handleSubbrandRemoveField() {
    if (subbrandFields.length > 1) {
      setSubbrandFields(subbrandFields.slice(0, subbrandFields.length - 1));
    }
  }

  const handleForm = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(urlEndPoint, values);
      console.log(response.data);
      setIsLoading(false);
      navigate("/brand/new");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    initialValues,
    validationSchema
  );

  return (
    <form style={formStyles.form} onSubmit={handleSubmit}>
      <div>
        <MyInput
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          style={formStyles.input}
        />
      </div>
      <label htmlFor="parent">Parent present:</label>
      <input
        type="checkbox"
        id="parent"
        checked={parent}
        onChange={handleParentChange}
      />
      {parent === true && (
        <div id="inputFields">
          <div>
            <label>Input field:</label>
            <select>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <label htmlFor="subbrand">Subbrand present:</label>
      <input
        type="checkbox"
        id="subbrand"
        checked={subbrand}
        onChange={handleSubbrandChange}
      />
      {subbrand === true && (
        <div id="inputFields">
          {subbrandFields.map((field) => (
            <div key={field.id}>
              <label htmlFor={`field${field.id}`}>
                Input field {field.id}:
              </label>
              <input
                type="text"
                id={`field${field.id}`}
                onChange={handleChange}
                placeholder="Subbrand name"
              />
            </div>
          ))}
          <button type="button" onClick={handleSubbrandAddField}>
            Add Field
          </button>
          <button
            type="button"
            onClick={handleSubbrandRemoveField}
            disabled={subbrandFields.length <= 1}
          >
            Remove Field
          </button>
        </div>
      )}
      <MyButton
        onClick={handleForm}
        disabled={isLoading}
        style={formStyles.button}
      >
        Submit
      </MyButton>
    </form>
  );
};

export default BrandForm;

const formStyles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  input: {
    width: "250px",
    padding: "0.5rem",
    margin: "1rem 0",
    fontSize: "1.2rem",
    border: "1px solid lightgray",
  },
  button: {
    width: "100%",
    padding: "1rem",
    margin: "1rem 0",
    backgroundColor: "#1890ff",
    color: "white",
    fontSize: "1.2rem",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    margin: "0.5rem 0",
  },
};
