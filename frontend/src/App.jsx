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
import ProductList from "./components/products/ProductList";
import StakeholderCategories from "./components/stakeholder/StakeholderCategories";
import StakeholderRegister from "./components/stakeholder/StakeholderRegister";
import AccountRegiser from "./components/account/AccountRegister";
import AccountCategory from "./components/account/AccountCategory";
import ProductBatch from "./components/products/ProductBatch";
import ProductBatchDetails from "./components/products/ProductBatchDetails";
import Inventory from "./components/inventory/Inventory";
import InventoryLocations from "./components/inventory/InventoryLocations";
import SalesForm from "./components/sales/salesForm";
import CreditSalesForm from "./components/sales/creditSalesForm";
import CreditPaymentForm from "./components/sales/creditPaymentForm";
import SalesRecord from "./components/sales/SalesRecord";
import AccountList from "./components/account/AccountList";
const App = () => (
  <BrowserRouter>
    <Navbar />
    <div className=" bg-bkg-dark ml-64">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
          <Route path="list" element={<ProductList />} />
          <Route path="batch" element={<ProductBatch />} />
          <Route path="batch-details" element={<ProductBatchDetails />} />
        </Route>
        <Route path="/account">
          <Route path="" element={<ProductsPage />} />
          <Route path="register" element={<AccountRegiser />} />
          <Route path="list" element={<AccountList />} />
          <Route path="category" element={<AccountCategory />} />
        </Route>

        <Route path="/company">
          <Route path="" element={<div>Company default</div>} />
          <Route path="register" element={<CompanyRegister />} />
        </Route>
        <Route path="/stakeholder">
          <Route path="" element={<div>Stakeholder default</div>} />
          <Route path="register" element={<StakeholderRegister />} />
          <Route path="category" element={<StakeholderCategories />} />
        </Route>

        <Route path="/inventory">
          <Route path="register" element={<Inventory />} />
          <Route path="location" element={<InventoryLocations />} />
        </Route>

        <Route path="/sales">
          <Route path="form" element={<SalesForm />} />
          <Route path="record" element={<SalesRecord />} />
          <Route path="credit" element={<CreditSalesForm />} />
          <Route path="payment" element={<CreditPaymentForm />} />
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
library.add(fab, fas, far);
