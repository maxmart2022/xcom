import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./components/admin/AdminDashboard";
// import CustomerPage from "./components/customer/CustomerPage";
// import { RouteWithCommonComponent } from "./components/customer/CustomerPageLayout";
import { Announcement } from "./components/pages/Announcement";
import BrandForm from "./components/pages/brandForm";
import CategoryAdd from "./components/pages/categoryAdd";
import { Invoice } from "./components/pages/Invoice";
import LoginForm from "./components/pages/loginForm";
import { ProductCreate } from "./components/pages";
import Header from "./components/common/Header";
// import TestLayout from "./components/pages/TestLayout";
// import LayoutProvider from "./contexts/LayoutContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <LayoutProvider>
          <TestLayout>
            <h1>My App</h1>
          </TestLayout>
        </LayoutProvider> */}
        <Header />
        <Routes>
          <Route exact path="/" element={<Announcement />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/category/new" element={<CategoryAdd />} />
          <Route path="/brand/new" element={<BrandForm />} />
          <Route path="/product/new" element={<ProductCreate />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
