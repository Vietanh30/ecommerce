import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import path from "./constants/path";
import Home from "./pages/Home/Home";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import About from "./pages/About/About";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllProduct from "./pages/AllProduct/AllProduct";
import OrderList from "./pages/OrderList/OrderList";
import ProductDetailAdmin from "./pages/ProductDetailAdmin/ProductDetailAdmin";
import AddProduct from "./pages/AddProduct/AddProduct";
import OrderDetailAdmin from "./pages/OderDetailAdmin/OrderDetailAdmin";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";

function App() {
  return (
    <Router>
      <Routes>
        {/* user */}
        <Route path={path.cart} element={<Cart />}></Route>
        <Route path={path.home} element={<Home />}></Route>
        <Route path={path.about} element={<About />}></Route>
        <Route path={path.error} element={<Error />}></Route>
        <Route path={path.login} element={<Login />}></Route>
        <Route path={path.register} element={<Register />}></Route>
        <Route path={path.products + `/:id`} element={<ProductDetail />} />
        <Route path={path.cart} element={<Cart />}></Route>
        <Route path={path.checkout} element={<Checkout />}></Route>
        {/* admin */}
        <Route path={path.loginAdmin} element={<LoginAdmin />}></Route>
        <Route path={path.dashboard} element={<Dashboard />}></Route>
        <Route path={path.allProduct} element={<AllProduct />}></Route>
        <Route path={path.allProduct + `/:id`} element={<ProductDetailAdmin />} />
        <Route path={path.orderList} element={<OrderList />}></Route>
        <Route path={path.orderList + `/:id`} element={<OrderDetailAdmin />} />

        <Route path={path.addProduct} element={<AddProduct />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
