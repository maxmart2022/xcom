import React, { useState } from "react";
import * as yup from "yup";
import {
  styled,
  Button,
  TextField,
  Checkbox,
  MenuItem,
  Select,
} from "@mui/material";

import useForm from "../../helpers/useForm";

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Label = styled("label")({
  fontWeight: "bold",
  marginBottom: "0.5rem",
});

const Input = styled(TextField)({
  marginBottom: "1rem",
});

const CheckboxContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem",
});

const CheckboxLabel = styled("label")({
  marginRight: "0.5rem",
});

const ParentCategoryContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "1rem",
});

const ParentCategorySelect = styled(Select)({
  minWidth: "200px",
  marginRight: "0.5rem",
});

const ParentCategoryDeleteButton = styled(Button)({
  marginLeft: "0.5rem",
});

const categories = [
  { id: "1", name: "Fashion" },
  { id: "2", name: "Electronics" },
  { id: "3", name: "Grocery" },
];

const CategoryAdd = () => {
  const [isParentCategories, setIsParentCategories] = useState(false);
  const [response, setResponse] = useState(null);

  const initialValues = {
    category: "",
    parentCategories: [""],
  };

  const validationSchema = yup.object().shape({
    category: yup.string().required("Category is required"),
    parentCategories: yup
      .array()
      .of(yup.string())
      .test(
        "no-duplicates",
        "Duplicate parent categories are not allowed",
        (values) => {
          if (!values) return true;
          const uniqueValues = new Set(values);
          return uniqueValues.size === values.length;
        }
      ),
  });

  const handleDeleteParentCategory = (index) => () => {
    setValues((values) => ({
      ...values,
      parentCategories: values.parentCategories.filter(
        (category, i) => i !== index
      ),
    }));

    if (values.parentCategories.length === 1) {
      setIsParentCategories(false);
    }
  };

  const handleAddParentCategory = () => {
    const isDisabled = values.parentCategories.length >= categories.length;
    if (!isDisabled) {
      setValues({
        ...values,
        parentCategories: [...values.parentCategories, ""],
      });
    }
  };

  const handleParentCategories = (e) => {
    const isChecked = e.target.checked;
    setIsParentCategories(isChecked);

    if (isChecked && values.parentCategories.length === 0) {
      setValues((values) => ({
        ...values,
        parentCategories: [""],
      }));
    } else if (!isChecked) {
      setValues((values) => ({
        ...values,
        parentCategories: [""],
      }));
    }
  };

  const {
    values,
    setValues,
    handleSubmit,
    handleChange,
    handleArrayChange,
    errors,
  } = useForm(initialValues, validationSchema);

  const handleFormSubmit = (event) => {
    const url = "https://xcom.dev/api/category/new";
    handleSubmit(event, url, setResponse);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Label htmlFor="category">Category:</Label>
      <Input
        id="category"
        name="category"
        value={values.category}
        onChange={handleChange}
        error={Boolean(errors.category)}
        helperText={errors.category}
      />

      <CheckboxContainer>
        <Checkbox
          id="show-parent-categories"
          checked={isParentCategories}
          onChange={handleParentCategories}
        />
        <CheckboxLabel htmlFor="show-parent-categories">
          Show Parent Categories:
        </CheckboxLabel>
        <Button
          disabled={
            !isParentCategories ||
            values.parentCategories.length >= categories.length
          }
          type="button"
          variant="contained"
          onClick={handleAddParentCategory}
        >
          Add
        </Button>
      </CheckboxContainer>

      {isParentCategories && (
        <ParentCategoryContainer>
          {values.parentCategories.map((parentCategory, index) => (
            <div key={index}>
              <ParentCategorySelect
                id={`parent-category-${index}`}
                value={parentCategory}
                onChange={handleArrayChange(index, "parentCategories")}
                error={Boolean(errors.parentCategories)}
              >
                <MenuItem value="" disabled>
                  <em>Select a parent category</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    disabled={values.parentCategories.includes(category.id)}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </ParentCategorySelect>
              <ParentCategoryDeleteButton
                variant="contained"
                color="secondary"
                onClick={handleDeleteParentCategory(index)}
              >
                -
              </ParentCategoryDeleteButton>
            </div>
          ))}
          {errors.parentCategories && <div>{errors.parentCategories}</div>}
          {response}
        </ParentCategoryContainer>
      )}

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Form>
  );
};

export default CategoryAdd;
