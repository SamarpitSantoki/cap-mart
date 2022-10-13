import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Banner from "../../components/HomePage/Banner";
import ProductContainer from "../../components/ProductContainer/ProductContainer";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const fetchProducts = async () => {
    const res = await axios.get(process.env.REACT_APP_BASE_URL + "/product");
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProducts();
    setCart(JSON.parse(sessionStorage.getItem("cart")));
  }, []);

  async function addToCart(product) {
    let tempCart = JSON.parse(sessionStorage.getItem("cart"));
    if (!tempCart) {
      setCart([product]);
      sessionStorage.setItem(
        "cart",
        JSON.stringify([{ ...product, count: 1 }])
      );
      return;
    }

    const exists = tempCart.find((item) => item._id === product._id);
    if (exists) {
      tempCart = tempCart.map((item) => {
        if (item._id === product._id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    } else {
      tempCart.push({ ...product, count: 1 });
    }

    setCart(tempCart);
    sessionStorage.setItem("cart", JSON.stringify(tempCart));
    return;
  }
  return (
    <Container>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Banner />
      </div>
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <ProductContainer data={products} addToCart={addToCart} />
      </div>
      <Footer />
    </Container>
  );
}
export default HomePage;
