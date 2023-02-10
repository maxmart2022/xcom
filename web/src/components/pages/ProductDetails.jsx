import React, { useState } from "react";

const ProductDetail = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img
          style={styles.image}
          src={selectedVariant.image}
          alt={product.title}
        />
      </div>
      <div style={styles.detailsContainer}>
        <div style={styles.title}>{product.title}</div>
        <div style={styles.variantsContainer}>
          {product.variants.map((variant) => (
            <div
              key={variant.id}
              style={{
                ...styles.variant,
                ...(selectedVariant.id === variant.id &&
                  styles.variantSelected),
              }}
              onClick={() => handleVariantSelect(variant)}
            >
              {variant.name}
            </div>
          ))}
        </div>
        <div style={styles.addToCartButton}>Add to Cart</div>
      </div>
    </div>
  );
};

export default ProductDetail;

// css
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
  },
  imageContainer: {
    width: "50%",
  },
  image: {
    width: "100%",
  },
  detailsContainer: {
    width: "50%",
    marginTop: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  variantsContainer: {
    marginTop: "20px",
  },
  variant: {
    cursor: "pointer",
    padding: "10px",
    border: "1px solid gray",
    borderRadius: "5px",
    marginRight: "10px",
  },
  variantSelected: {
    backgroundColor: "gray",
    color: "white",
  },
  addToCartButton: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
