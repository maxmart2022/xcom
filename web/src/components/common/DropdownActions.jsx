import React, { useState } from "react";
import styles from "./Common.module.css";

const DropdownActions = (props) => {
  const { items } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div>
      <button className={styles.dropdownButton} onClick={handleToggle}>
        {selectedItem}
      </button>

      {isOpen && (
        <ul className={styles.dropdownContent}>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownActions;
