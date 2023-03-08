import React, { useState } from "react";
import { Modal } from "../common/GeneralComponents";

export const CartModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button onClick={toggleModal}>Open Modal</button>
      <Modal toggleModal={toggleModal} showModal={showModal}>
        <h2>Modal Content</h2>
        <p>This is some content for the modal.</p>
      </Modal>
    </div>
  );
};
