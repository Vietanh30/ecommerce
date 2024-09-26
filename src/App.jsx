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
import AddProductChild from "./pages/AddProductChild/AddProductChild";
import ErrorAdmin from "./pages/ErrorAdmin/ErrorAdmin";
import ProductChildDetail from "./pages/ProductChildDetail/ProductChildDetail";
import AllCategories from "./pages/AllCategories/AllCategories";
import { AuthProvider } from "./components/PrivateRoute/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HistoryOrder from "./pages/HistoryOrder/HistoryOrder";

function App() {  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* user routes */}
          <Route path={path.cart} element={
            <PrivateRoute requiredRole={2}><Cart /></PrivateRoute>
          } />
          <Route path={path.home} element={<Home />} />
          <Route path={path.about} element={<About />} />
          <Route path={path.error} element={<Error />} />
          <Route path={path.login} element={<Login />} />
          <Route path={path.register} element={<Register />} />
          <Route path={path.products + `/:id`} element={<ProductDetail />} />
          <Route path={path.checkout} element={
            <PrivateRoute requiredRole={2}><Checkout /></PrivateRoute>
          } />
          <Route path={path.historyOrder} element={
            <PrivateRoute requiredRole={2}><HistoryOrder /></PrivateRoute>
          } />
          {/* admin routes */}
          <Route path={path.loginAdmin} element={<LoginAdmin />} />
          <Route path={path.dashboard} element={
            <PrivateRoute requiredRole={1}><Dashboard /></PrivateRoute>
          } />
          <Route path={path.allProduct} element={
            <PrivateRoute requiredRole={1}><AllProduct /></PrivateRoute>
          } />
          <Route path={path.allProduct + `/:id`} element={
            <PrivateRoute requiredRole={1}><ProductDetailAdmin /></PrivateRoute>
          } />
          <Route path={path.orderList} element={
            <PrivateRoute requiredRole={1}><OrderList /></PrivateRoute>
          } />
          <Route path={path.orderList + `/:id`} element={
            <PrivateRoute requiredRole={1}><OrderDetailAdmin /></PrivateRoute>
          } />
          <Route path={path.allCategories} element={
            <PrivateRoute requiredRole={1}><AllCategories /></PrivateRoute>
          } />
          <Route path={path.addProduct} element={
            <PrivateRoute requiredRole={1}><AddProduct /></PrivateRoute>
          } />
          <Route path={path.addProductChild(':id')} element={
            <PrivateRoute requiredRole={1}><AddProductChild /></PrivateRoute>
          } />
          <Route path={path.productChildDetail(':id')} element={
            <PrivateRoute requiredRole={1}><ProductChildDetail /></PrivateRoute>
          } />
          <Route path={path.errorAdmin} element={
            <PrivateRoute requiredRole={1}><ErrorAdmin /></PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;