import React, { useContext } from "react";
import { GlobalStateContext } from "../../contexts/GlobalStateProvider";

const Cart = () => {
  const { cart, increaseQty, decreaseQty } = useContext(GlobalStateContext);

  return (
    <div>
      {cart.map((item, index) => (
        <div key={item.name}>
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>Qty: {item.qty}</p>
          <button onClick={() => increaseQty(index)}>+</button>
          <button onClick={() => decreaseQty(index)}>-</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
