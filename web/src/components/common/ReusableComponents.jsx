import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Styles from "./GeneralStyle";
import { colors } from "./colors";

// List of Components in this file
// 1. MyInput
// 2. MyButton
// 3. MySearch - No here
// 4. MyModal

// Input Component
export const MyInput = ({ name, type = "text", value, ...props }) => {
  return (
    <div className="myInputContainer">
      <label>{name}</label>
      <input
        type={type}
        name={name}
        placeholder={name}
        value={value || ""}
        {...props}
      />
    </div>
  );
};

// Button
export const MyButton = ({ children, onClick }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={
        isHover ? { ...Styles.button, ...Styles.button.hover } : Styles.button
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const MyForm = ({ children }) => {
  const styles = {
    formContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "50px",
      backgroundColor: colors.primaryColor,
      width: "200px",
      height: "500px",
      padding: "20px",
    },
  };
  return (
    <div>
      <div style={styles.formContainer}>{children}</div>;
    </div>
  );
};

// Reusable TableFormComponent
export const TableFormComponent = ({ columns, data, renderRow, handleAdd }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => renderRow(row, index))}
        <tr>
          <td colSpan={columns.length}>
            <button type="button" onClick={handleAdd}>
              Add Row
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// Table Component
export const TableReportComponent = ({ rows, columns, addRow }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [newRows, setNewRows] = useState(rows);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedIndex === null) {
      return;
    }

    let newOrder = [...newRows];
    let removed = newOrder.splice(draggedIndex, 1)[0];
    newOrder.splice(index, 0, removed);

    setNewRows(newOrder);
    setDraggedIndex(null);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newRows.map((row, index) => (
            <tr
              key={row.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDrop={() => handleDrop(index)}
              onDragOver={(event) => event.preventDefault()}
            >
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
              <td>
                <button onClick={addRow}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

// List Item
export const ListItem = ({ link, name, icon, customStyles }) => {
  const defaultStyles = {
    navItem: {
      marginBottom: "10px",
      display: "block",
    },
    navLink: {
      color: "#fff",
      display: "block",
      padding: "10px",
      textDecoration: "none",
    },
    navLinkIcon: {
      float: "left",
      marginRight: "10px",
    },
  };

  const combinedStyles = { ...defaultStyles, ...customStyles };

  return (
    <li style={combinedStyles.navItem}>
      <Link to={link} style={combinedStyles.navLink}>
        <FontAwesomeIcon style={combinedStyles.navLinkIcon} icon={icon} />
        <span>{name}</span>
      </Link>
    </li>
  );
};

// Reusable Modal Component
export const MyModal = ({ children, toggleModal, showModal }) => {
  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={toggleModal}> X </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

// file upload
export const ImageUpload = () => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
};
