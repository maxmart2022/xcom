import React from "react";

// const Grid = ({ children }) => {
//   return <div style={gridStyles}>{children}</div>;
// };

const Grid = ({ children }) => {
  return (
    <div style={gridStyles}>
      {React.Children.map(children, (child) => (
        <div
          style={{
            backgroundColor: "white",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Grid;

const gridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
  gridGap: "6px",
  padding: "0 20px",
  overflowX: "hidden",
};
