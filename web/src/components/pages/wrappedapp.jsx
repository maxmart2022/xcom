import React, { useContext } from "react";
import GlobalStateProvider from "../../contexts/GlobalStateProvider";
import { GlobalStateContext } from "../../contexts/GlobalStateProvider";

function App() {
  const { products, cart, user, loading } = useContext(GlobalStateContext);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Products: {JSON.stringify(products)}</div>
          <div>Cart: {JSON.stringify(cart)}</div>
          <div>User: {JSON.stringify(user)}</div>
        </>
      )}
    </div>
  );
}

function WrappedApp() {
  return (
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  );
}

export default WrappedApp;
