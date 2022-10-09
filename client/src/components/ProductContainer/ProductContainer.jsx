import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row } from "react-bootstrap";
import Product from "./Product";
import styles from "./ProductContainer.module.css";

const ProductContainer = () => {
  return (
    <div className={styles.rectangleDiv}>
      <div className={styles.rectangleDiv1} />
      <Row sm={4}>
        <Col>
          <Product />
        </Col>
        <Col>
          <Product />
        </Col>
        <Col>
          <Product />
        </Col>
        <Col>
          <Product />
        </Col>
        <Col>
          <Product />
        </Col>
        <Col>
          <Product />
        </Col>
        <Col>
          <Product />
        </Col>
        <Col>
          <Product />
        </Col>
      </Row>
    </div>
  );
};

export default ProductContainer;
