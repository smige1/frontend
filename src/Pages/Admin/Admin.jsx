import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../Components/Admin/AddProduct/AddProduct";
import Home from "../../Components/Admin/Home/Home";
import Navbar from "../../Components/Admin/Navbar/Navbar";
import OrderDetails from "../../Components/Admin/OrderDetails/OrderDetails";
import Orders from "../../Components/Admin/Orders/Orders";
import ViewProducts from "../../Components/Admin/ViewProducts/ViewProducts";

import styles from "./Admin.module.scss";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;