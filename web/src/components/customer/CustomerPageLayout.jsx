import { Route } from "react-router-dom";

import { Footer } from "../common/GeneralComponents";
import Navbar from "../common/Navbar";
import TopNav from "../common/TopNav";

const CustomerPageLayout = ({ children }) => {
  return (
    <>
      <div style={Style.Container}>
        <div style={Style.Header}>
          <TopNav />
          <Navbar />
        </div>
        <div style={Style.Body}>{children}</div>
        <div style={Style.Footer}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export const RouteWithCommonComponent = ({ component: Component }) => {
  return (
    <Route
      render={(props) => (
        <CustomerPageLayout>
          <Component {...props} />
        </CustomerPageLayout>
      )}
    />
  );
};

// Style
const Style = {
  Container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  Header: {
    background: "lightgray",
    height: "150px",
  },
  Body: {
    background: "white",
    flex: 1,
  },
  Footer: {
    background: "lightgray",
    height: "50px",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  "@media (max-width: 767px)": {
    Header: {
      height: "100px",
    },
    Footer: {
      height: "30px",
    },
  },
};
