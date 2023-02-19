import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProductCreate = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [variants, setVariants] = useState([{ name: "", options: [] }]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would add the product to your database or send it to an API
    console.log(
      `Product ${productName} with description ${productDescription}, ${productImages.length} images, and ${variants.length} variants was submitted`
    );
    console.log(productName, productDescription, productImages, variants);
  };

  const handleImageChange = (event) => {
    const images = event.target.files;
    const imageArray = [];

    for (let i = 0; i < images.length; i++) {
      const imageURL = URL.createObjectURL(images[i]);
      imageArray.push(imageURL);
    }

    setProductImages(imageArray);
  };

  const handleVariantNameChange = (event, index) => {
    const newVariants = [...variants];
    newVariants[index].name = event.target.value;
    setVariants(newVariants);
  };

  const handleVariantOptionChange = (event, index, optionIndex) => {
    const newVariants = [...variants];
    newVariants[index].options[optionIndex] = event.target.value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", options: [] }]);
  };

  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const addVariantOption = (index) => {
    const newVariants = [...variants];
    newVariants[index].options.push("");
    setVariants(newVariants);
  };

  const removeVariantOption = (index, optionIndex) => {
    const newVariants = [...variants];
    newVariants[index].options.splice(optionIndex, 1);
    setVariants(newVariants);
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="50px">
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Product Name"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Product Description"
            variant="outlined"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div>
          <Typography>Product Images:</Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div>
          <Typography variant="h6">Variants</Typography>
          {variants.map((variant, index) => (
            <div key={index}>
              <TextField
                label="Variant Name"
                variant="outlined"
                value={variant.name}
                onChange={(e) => handleVariantNameChange(e, index)}
              />
              {variant.options.map((option, optionIndex) => (
                <Box display="flex" alignItems="center" key={optionIndex}>
                  <TextField
                    label="Variant Option"
                    variant="outlined"
                    value={option}
                    onChange={(e) =>
                      handleVariantOptionChange(e, index, optionIndex)
                    }
                  />
                  <IconButton
                    onClick={() => removeVariantOption(index, optionIndex)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => addVariantOption(index)}
              >
                Add Variant Option
              </Button>
              <IconButton onClick={() => removeVariant(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button variant="contained" color="primary" onClick={addVariant}>
            Add Variant
          </Button>
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
};
