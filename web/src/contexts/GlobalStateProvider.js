import React, { useState, useEffect } from "react";
import axios from "axios";
import { createContext } from "react";

export const GlobalStateContext = createContext();
const initialState = {
  cart: [],
  products: [],
  user: null,
  loading: true,
};

function GlobalStateProvider({ children }) {
  const [cart, setCart] = useState(initialState.cart);
  const [products, setProducts] = useState(initialState.products);
  const [user, setUser] = useState(initialState.user);
  const [loading, setLoading] = useState(initialState.loading);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const increaseQty = (productId) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      })
    );
  };

  const decreaseQty = (productId) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId && item.qty > 0) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQty,
        decreaseQty,
        products,
        setProducts,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export default GlobalStateProvider;
