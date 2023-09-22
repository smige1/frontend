import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import  Home from "./Pages/Home/Home";
import  Admin  from "./Pages/Admin/Admin";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Authentication/Login"
import Register from "./Pages/Authentication/Register"
import Reset from "./Pages/Authentication/Reset"
// Components
import { Header, Footer } from "./Components";
import AdminOnlyRoute from "./Components/AdminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./Components/Products/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import CheckoutDetails from "./Pages/Checkout/CheckoutDetails";
import Checkout from "./Pages/Checkout/Checkout";
import CheckoutSuccess from "./Pages/Checkout/CheckoutSuccess";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import OrderDetails from "./Pages/Orderdetails/OrderDetails";
import ReviewProducts from "./Components/ReviewProduct/ReviewProduct";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;