// CSS
const Styles = {
  // General
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center",
    hover: {
      backgroundColor: "black",
    },
  },
  myInputContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  // Top Nav Style
  topNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  // For Logo
  leftItems: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "20px",
  },
  logoImg: {
    height: "100%",
  },
  // Middle Container
  middleItems: {
    width: "70%",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },

  searchContainer: {
    width: "100%",
    display: "flex",
    // listStyle: "none",
    // alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "0.5rem 1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginRight: "1rem",
  },
  flexRight: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  searchInput: {
    // width: "100%",
    width: "1100px",
    padding: "0.5rem",
    border: "none",
    fontSize: "1rem",
    outline: "none",
  },
  searchButton: {
    backgroundColor: "#f5f5f5",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
    outline: "none",
    borderRadius: "0 25px 25px 0",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLinksItem: {
    marginLeft: "3rem",
  },
  navLinksLink: {
    color: "#333",
    textDecoration: "none",
    fontSize: "1rem",
  },
  cartIcon: {
    marginLeft: "0.5rem",
  },
  Header: {
    backgroundColor: "#fff",
  },
};

export default Styles;
