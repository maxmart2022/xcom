import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddProductForm = () => {
  const [variants, setVariants] = useState([]);
  const [variantTypes, setVariantTypes] = useState([]);

  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // make a POST request to save the product and its variants to your database
  };

  const handleVariantTypeChange = (e) => {
    const selectedVariantTypes = e.target.options
      .filter((option) => option.selected)
      .map((option) => option.value);

    setVariantTypes(selectedVariantTypes);
  };

  const addVariant = () => {
    const newVariants = variants.concat({
      sku: "",
      barcode: "",
      quantity: 0,
      price: 0,
    });

    setVariants(newVariants);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input type="text" name="productName" ref={register} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea name="description" ref={register} />
      </div>
      <div>
        <label htmlFor="variantTypes">Variant Types:</label>
        <select
          multiple
          name="variantTypes"
          onChange={handleVariantTypeChange}
          ref={register}
        >
          <option value="Size">Size</option>
          <option value="Color">Color</option>
          <option value="Material">Material</option>
        </select>
      </div>
      {variants.map((variant, index) => (
        <div key={index}>
          {variantTypes.map((variantType, index) => (
            <div key={index}>
              <label htmlFor={`variant-${index}-${variantType}`}>
                {variantType}:
              </label>
              <input
                type="text"
                name={`variant-${index}-${variantType}`}
                ref={register}
              />
            </div>
          ))}
          <div>
            <label htmlFor={`variant-${index}-sku`}>SKU:</label>
            <input
              type="text"
              name={`variant-${index}-sku`}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor={`variant-${index}-barcode`}>Barcode:</label>
            <input
              type="text"
              name={`variant-${index}-barcode`}
              ref={register}
            />
