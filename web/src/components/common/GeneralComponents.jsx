import React from "react";
import { Link } from "react-router-dom";

// Footer Component
export const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div style={sectionStyles}>
          <h4 style={headerStyles}>About Us</h4>
          <p style={{ color: "gray", marginBottom: "10px" }}>
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div style={sectionStyles}>
          <h4 style={headerStyles}>Quick Links</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}>
              <Link to="/">Home</Link>
            </li>
            <li style={listItemStyles}>
              <Link to="/about">About</Link>
            </li>
            <li style={listItemStyles}>
              <Link to="/services">Services</Link>
            </li>
            <li style={listItemStyles}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div style={sectionStyles}>
          <h4 style={headerStyles}>Contact Us</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}>
              <i className="fas fa-map-marker-alt" />
              Address: 123 Main St, City, State ZIP
            </li>
            <li style={listItemStyles}>
              <i className="fas fa-phone" />
              Phone: (123) 456-7890
            </li>
            <li style={listItemStyles}>
              <i className="fas fa-envelope" />
              Email: info@yourcompany.com
            </li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "10px", color: "gray" }}>
        Copyright &copy; 2023 Your Company Name
      </div>
    </footer>
  );
};

// Footer Styles
const footerStyles = {
  background: "lightgray",
  padding: "40px",
};

const sectionStyles = {
  display: "flex",
  flexDirection: "column",
};

const headerStyles = {
  color: "black",
  marginBottom: "20px",
};

const listStyles = {
  listStyleType: "none",
  margin: 0,
  padding: 0,
};

const listItemStyles = {
  marginBottom: "10px",
};
