import { Route, Routes } from "react-router-dom";
import CategoryList from "../components/Admin/Category";
import OrderList from "../components/Admin/Orders";
import Product from "../components/Admin/Product";
import SubCategoryList from "../components/Admin/SubCategory";
import UserList from "../components/Admin/Users";
import AdminPage from "../pages/Admin";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login";
import Order from "../pages/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import Register from "../pages/Register";

function index() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/order" element={<Order />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<Product />} />
        <Route path="product" element={<Product />} />
        <Route path="users" element={<UserList />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="category" element={<CategoryList />} />
        <Route path="subcategory" element={<SubCategoryList />} />
      </Route>
    </Routes>
  );
}
export default index;
