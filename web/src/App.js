import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./components/admin/AdminDashboard";
// import CustomerPage from "./components/customer/CustomerPage";
// import { RouteWithCommonComponent } from "./components/customer/CustomerPageLayout";
import { Announcement } from "./components/pages/Announcement";
import BrandForm from "./components/pages/brandForm";
import CategoryForm from "./components/pages/categoryForm";
import { Invoice } from "./components/pages/Invoice";
import LoginForm from "./components/pages/loginForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<Announcement />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/category/new" element={<CategoryForm />} />
          <Route path="/brand/new" element={<BrandForm />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
