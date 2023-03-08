import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ProductsListing.css";
import Carousel from "../common/Carousel";

function ProductsListing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // try {
    //   const response = axios.get("https://jsonplaceholder.typicode.com/photos");
    //   setProducts(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setProducts(response.data);
        // console.log(response);
      });
  }, []);

  return (
    <div className="product">
      <Carousel items={products}>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.url} alt={product.title} />
            <h3>{product.title}</h3>
            {/* <p>{product.price}</p> */}
            <button>Add to Cart</button>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ProductsListing;
