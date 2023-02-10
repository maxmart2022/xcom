import React, { useState } from "react";
import * as Yup from "yup";

import useForm from "../../helpers/useForm";

export const Invoice = () => {
  const columns = [
    "button",
    "Item",
    "Description",
    "Price",
    "Quantity",
    "Amount",
  ];
  const initialData = [
    { item: "", description: "", price: "", quantity: "", amount: "" },
  ];

  const validationSchema = Yup.object().shape({
    item: Yup.string().required("Item is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    quantity: Yup.number().required("Quantity is required"),
    amount: Yup.number().required("Amount is required"),
  });

  const { handleChange, values, handleSubmit, errors } = useForm(
    initialData,
    validationSchema
  );

  const [data, setData] = useState(initialData);

  const handleAdd = () => {
    setData([
      ...data,
      { item: "", description: "", price: "", quantity: "", amount: "" },
    ]);
  };

  const renderRow = (row, index) => (
    <tr key={index}>
      {columns.map((column, colIndex) => (
        <td key={colIndex}>
          <input
            // type="text"
            name={`${column.toLowerCase()}${index}`}
            value={values[`${column.toLowerCase()}${index}`]}
            onChange={handleChange}
            required
          />
          {errors[`${column.toLowerCase()}${index}`] && (
            <p>{errors[`${column.toLowerCase()}${index}`]}</p>
          )}
        </td>
      ))}
    </tr>
  );

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => renderRow(row, index))}
          <tr>
            <td colSpan={columns.length}>
              <button type="button" onClick={handleAdd}>
                Add Rows
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
};
