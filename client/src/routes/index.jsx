import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login";
import ProductPage from "../pages/ProductPage/ProductPage";
import Register from "../pages/Register";

function index() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default index;
