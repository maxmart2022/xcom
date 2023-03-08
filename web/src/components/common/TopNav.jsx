import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MyModal } from "./ReusableComponents";
import Styles from "./GeneralStyle";
import Search from "./Search";

// import styles from "./TopNav.module.css";

const TopNav = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div style={Styles.Header}>
      <nav style={Styles.topNav}>
        <div style={Styles.leftItems}>
          <Link to="/">
            <img src="Xcom-logo1.png" alt="Logo" />
          </Link>
        </div>
        <div style={Styles.middleItems}>
          {/* <input type="text" placeholder="Search products..." /> */}
          {/* <button type="submit">Search</button> */}

          <Search />
        </div>
        <div style={Styles.flexRight}>
          <ul style={Styles.navLinks}>
            <li style={Styles.navLinksItem}>
              <Link to="/cart" onClick={toggleModal}>
                Cart <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
            <li style={Styles.navLinksItem}>
              <Link to="/login" onClick>
                Login <i className="fas fa-user"></i>
              </Link>
            </li>
          </ul>
        </div>
        <MyModal />
      </nav>
    </div>
  );
};

export default TopNav;
