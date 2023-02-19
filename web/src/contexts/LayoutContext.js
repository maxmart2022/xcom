import React from "react";

const LayoutContext = React.createContext({
  layout: "default",
});

const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = React.useState("default");

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
