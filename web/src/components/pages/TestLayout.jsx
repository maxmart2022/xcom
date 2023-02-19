import React from "react";
import LayoutContext from "../../contexts/LayoutContext";

const TestLayout = ({ children }) => {
  const { layout } = React.useContext(LayoutContext);

  return <div className={`page ${layout}`}>{children}</div>;
};

export default TestLayout;
