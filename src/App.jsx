import { library } from "@fortawesome/fontawesome-svg-core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
// import your icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import CustomersPage from "./pages/CustomersPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";
import TransactionsPage from "./pages/TransactionsPage";
import CustomerCreateForm from "./components/customers/CustomerCreateForm";
import Navbar from "./components/layout/Navbar";
import CustomerList from "./components/customers/CustomerList";
import ProductRegisterForm from "./components/products/ProductRegisterForm";
import ProductCategory from "./components/products/ProductCategory";
import ProductUnit from "./components/products/ProductUnit";
import CompanyRegister from "./components/company/CompanyRegister";

const App = () => (
  <BrowserRouter>
    <div className="flex gap-x-4 h-screen">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/customer">
          <Route path="" element={<CustomersPage />} />
          <Route path="create" element={<CustomerCreateForm />} />
          <Route path="analytics" element={<div>Customer Analytics</div>} />
          <Route path="invoices" element={<div>Customer Invoices</div>} />
          <Route path=":id" element={<div>Customer Detail</div>} />
          <Route path="list" element={<CustomerList />} />
        </Route>
        <Route path="/product">
          <Route path="" element={<ProductsPage />} />
          <Route path="add" element={<ProductRegisterForm />} />
          <Route path="category" element={<ProductCategory />} />
          <Route path="unit" element={<ProductUnit />} />
        </Route>

        <Route path="/company">
          <Route path="" element={<div>Company default</div>} />
          <Route path="register" element={<CompanyRegister />} />
        </Route>

        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
library.add(fab, fas, far);
