import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row } from "react-bootstrap";
import Product from "./Product";
import styles from "./ProductContainer.module.css";

const ProductContainer = ({ data, addToCart }) => {
  return (
    <div className={styles.rectangleDiv}>
      <div className={styles.rectangleDiv1} />
      <Row xs={2} md={4}>
        {data?.map((item) => (
          <Col
            style={{
              marginBottom: "1rem",
            }}
          >
            <Product addToCart={addToCart} key={item._id} data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductContainer;
