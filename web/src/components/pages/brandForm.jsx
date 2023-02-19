import React, { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  brand: yup.string().required("Brand is required"),
  parentBrand: yup.string().nullable().notRequired(),
});

function BrandForm() {
  const [values, setValues] = useState({
    brand: "",
    parentBrand: null,
  });

  const [errors, setErrors] = useState({});

  const [showParentBrand, setShowParentBrand] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    schema
      .validate(values, { abortEarly: false })
      .then(() => {
        console.log("Values:", values);
        setValues({ brand: "", parentBrand: null });
        setErrors({});
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleDeleteParentBrand = () => {
    setValues({ ...values, parentBrand: null });
  };

  const handleShowParentBrand = (e) => {
    setShowParentBrand(e.target.checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          value={values.brand}
          onChange={handleChange}
        />
        {errors.brand && <div>{errors.brand}</div>}
      </div>
      <div>
        <label htmlFor="show-parent-brand">Parent Brand:</label>
        <input
          type="checkbox"
          id="show-parent-brand"
          checked={showParentBrand}
          onChange={handleShowParentBrand}
        />
        {showParentBrand && (
          <div>
            {values.parentBrand === null ? (
              <select
                id="parent-brand"
                value={""}
                onChange={(e) =>
                  setValues({ ...values, parentBrand: e.target.value })
                }
              >
                <option value="">Select a parent brand</option>
                <option value="Brand 1">Brand 1</option>
                <option value="Brand 2">Brand 2</option>
                <option value="Brand 3">Brand 3</option>
                {/* Add more options as necessary */}
              </select>
            ) : (
              <div>
                <div>{values.parentBrand}</div>
                <button onClick={handleDeleteParentBrand}>Delete</button>
              </div>
            )}
            {errors.parentBrand && <div>{errors.parentBrand}</div>}
          </div>
        )}
      </div>
      <button type="submit">Add Brand</button>
    </form>
  );
}

export default BrandForm;
