import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import useForm from "../../helpers/useForm";
import { MyInput, MyButton, MyForm } from "../common/ReusableComponents";

const CategoryForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const [parentFields, setParentFields] = useState([{ id: 1 }]);
  const categories = [
    { id: 1, name: "mobile phones" },
    { id: 2, name: "laptops" },
    { id: 3, name: "headphones" },
    { id: 4, name: "tablets" },
  ];

  const navigate = useNavigate();
  const urlEndPoint = "https://xcom.dev/api/category/new";

  const initialValues = {
    categoryName: "",
    parentCategories: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
  });

  function handleParentChange(event) {
    setIsParent(event.target.checked);
  }

  function handleParentAddField() {
    setParentFields([...parentFields, { id: parentFields.length + 1 }]);
  }

  function handleParentRemoveField(id) {
    setParentFields(parentFields.filter((field) => field.id !== id));
  }

  const handleForm = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(urlEndPoint, values);
      console.log(response.data);
      setIsLoading(false);
      navigate("/category/new");
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
    <MyForm onSubmit={handleSubmit}>
      <div>
        <MyInput
          name="categoryName"
          placeholder="Name"
          value={values.categoryName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="parent">Parent present:</label>
        <input
          type="checkbox"
          id="parent"
          checked={isParent}
          onChange={handleParentChange}
        />
        {isParent && (
          <button type="button" onClick={handleParentAddField}>
            Add Field
          </button>
        )}
      </div>

      {isParent === true && (
        <div id="inputFields">
          {parentFields.map((field) => (
            <div key={field.id}>
              <label htmlFor={`field ${field.id}`}>
                Parent Name {field.id}:
              </label>
              {/* <select
                multiple
                name="parentCategories"
                value={values.parentCategories}
                // value={values.parentCategories.map((cat) => cat.value)}
                onChange={handleChange}
              >
                <option value="technology">Technology</option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="travel">Travel</option>
              </select> */}
              <select
                // id={`field ${field.id}`}
                name="parentCategories"
                values={values.parentCategories}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <MyButton
                onClick={() => handleParentRemoveField(field.id)}
                disabled={parentFields.length <= 1}
              >
                -
              </MyButton>
            </div>
          ))}
        </div>
      )}
      <MyButton onClick={handleForm} disabled={isLoading}>
        Submit
      </MyButton>
    </MyForm>
  );
};

export default CategoryForm;
