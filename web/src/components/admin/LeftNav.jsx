import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTachometerAlt,
  faShoppingBasket,
  faTruck,
  faBoxOpen,
  faChartBar,
  faCog,
  faUserFriends,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ListItem } from "../common/ReusableComponents";

const LeftNavigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // List of Items
  const lists = [
    { link: "/dashboard", name: "Dashboard", icon: faTachometerAlt },
    { link: "/categories", name: "Categories", icon: faListAlt },
    { link: "/products", name: "Products", icon: faShoppingBasket },
    { link: "/suppliers", name: "Suppliers", icon: faTruck },
    { link: "/customers", name: "Customers", icon: faUserFriends },
    { link: "/orders", name: "Orders", icon: faBoxOpen },
    { link: "/reports", name: "Reports", icon: faChartBar },
    { link: "/settings", name: "Settings", icon: faCog },
  ];

  // style
  const styles = {
    leftNav: {
      backgroundColor: "#2c3e50",
      height: "100%",
      width: isCollapsed ? "0px" : "200px",
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      padding: "10px",
      transition: "all 0.3s",
    },
    collapseBtn: {
      backgroundColor: "transparent",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      position: "absolute",
      top: "20px",
      right: "20px",
    },
    nav: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <nav style={styles.leftNav}>
      <button style={styles.collapseBtn} onClick={handleCollapse}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul style={styles.nav}>
        {lists.map((list) => (
          <ListItem link={list.link} name={list.name} icon={list.icon} />
        ))}
      </ul>
    </nav>
  );
};

export default LeftNavigation;
