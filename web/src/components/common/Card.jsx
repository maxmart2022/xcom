import React from "react";
import { MyButton } from "./ReusableComponents";

const Card = ({ image, name, description, price, addToCart }) => {
  return (
    <div style={cardStyles}>
      <img style={imageStyles} src={image} alt={name} />
      <h3>{name}</h3>
      {/* <p>{description}</p> */}
      <p>${price}</p>
      <MyButton onClick={addToCart}>Add</MyButton>
    </div>
  );
};

export default Card;

// Style
const cardStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "300px",
  height: "400px",
  padding: "16px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
};

const imageStyles = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px 10px 0 0",
};
