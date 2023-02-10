import React from "react";
// import Categories from "./Categories";
import LeftNavigation from "./LeftNav";

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "250px",
          // background: "lightgray",
        }}
      >
        <LeftNavigation />
      </div>
      <div style={{ flex: 1, background: "white" }}>
        <h1>Right Component</h1>
        {/* <Categories /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
