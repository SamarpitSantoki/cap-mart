import { Container } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Banner from "../../components/HomePage/Banner";
import ProductContainer from "../../components/ProductContainer/ProductContainer";

function HomePage() {
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
        <ProductContainer />
      </div>
      <Footer />
    </Container>
  );
}
export default HomePage;
