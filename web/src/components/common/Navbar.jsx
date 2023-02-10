// import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export const Navbar = () => {
  // const [activeLink, setActiveLink] = useState("");

  const links = [
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" },
    { name: "Products", url: "/products" },
    { name: "Shop", url: "/shop" },
    { name: "Register", url: "/register" },
  ];

  return (
    <nav>
      <ul style={navbarStyles}>
        {links.map((link) => (
          <CustomLink key={link.name} to={link.url}>
            {link.name}
          </CustomLink>
        ))}
      </ul>
    </nav>
  );
};

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li
      style={Object.assign(
        {},
        CustomLinkStyles,
        isActive ? activeLinkStyles : {}
      )}
    >
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default Navbar;

const navbarStyles = {
  display: "flex",
  justifyContent: "flex-end",
  listStyleType: "none",
  margin: 0,
  padding: 0,
};

const CustomLinkStyles = {
  display: "inline-block",
  padding: "1rem",
};

const activeLinkStyles = {
  backgroundColor: "#ccc",
};
