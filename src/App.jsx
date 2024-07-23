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

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/customers" element={<CustomersPage />}>
        {/* <Route path="/:customerId" element={} /> */}
      </Route>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
library.add(fab, fas, far);
