import { Container } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Banner from "../../components/HomePage/Banner";
import ProductContainer from "../../components/ProductContainer/ProductContainer";
import ProductInfo from "../../components/ProductPage/ProductInfo";

function ProductPage() {
  return (
    <Container>
      <Header />

      <ProductInfo />

      <div
        style={{
          marginTop: "50px",
        }}
      ></div>
      <Footer />
    </Container>
  );
}
export default ProductPage;
