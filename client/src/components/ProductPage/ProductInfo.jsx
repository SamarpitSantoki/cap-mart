import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
function ProductInfo() {
  const id = useParams();
  const [product, setProduct] = useState({});
const [bigImage, setBigImage] = useState(0);
const fetchProduct = async () => {
  const res = await axios.get(
    process.env.REACT_APP_BASE_URL + "/product/" + id.id
  );
  setProduct(res.data);
};

useEffect(() => {
  fetchProduct();
}, []);

const changeCount = (e) => {
  setProduct({ ...product, count: e.target.value });
};

const changeSize = (e) => {
  setProduct({ ...product, size: e.target.value });
};

const changeColor = (e) => {
  setProduct({ ...product, color: e.target.value });
};

if (!product._id) {
  return <h3>Page Loading</h3>;
}

return (
  <Container>
    <Row
      style={{
        marginInline: "auto",
      }}
    >
      <Row
        sm={3}
        style={{
          margin: "auto",
          backgroundColor: "whitesmoke",
          borderRadius: 10,
        }}
      >
        <Col sm={8}>
          <Row>
            <h1 className={styles.productTitle}>{product.name}</h1>
          </Row>
          <Row>
            <img
              style={{
                margin: 10,
                maxHeight: "50vh",
                aspectRatio: "16/9",
              }}
              src={
                "/product_images/" +
                product._id +
                "/" +
                product?.image[bigImage]
              }
              alt=""
            />
          </Row>
        </Col>
        <Col>
          <div className={styles.imageContainer}>
            {product.image.map((item, i) => {
              if (i === bigImage) {
                return;
              }
              return (
                <img
                  key={i}
                  onClick={() => {
                    setBigImage(i);
                    return;
                  }}
                  width={250}
                  src={"/product_images/" + product._id + "/" + item}
                  alt=""
                />
              );
            })}
          </div>
        </Col>
      </Row>

      <Row className={styles.productInfo}>
        <Col>
          <span
            style={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              color: "red",
            }}
          >
            <h3>₹ {product.displayPrice} </h3>
            {product.price !== product.displayPrice && (
              <h6>
                <s>{product.price}</s>
              </h6>
            )}{" "}
          </span>
          <div className={styles.productDescription}>
            <h4>Description</h4>
            {product.description}
            <h5>composition: 100% nylo</h5>
            <h5>design: raftaar x raftar</h5>
            <h5>color: pink</h5>
            <h5>style: snapback cap</h5>
            <h5>fitting: one size fits</h5>
            <h5>buckel strap: 53.5 to 59.5cm</h5>
            <h5>warranty: 1 Year stiching warranty</h5>
          </div>
        </Col>
        <Col>
          <Row>
            <div className={styles.checkoutBox}>
              <h3>Checkout</h3>
              <div className={styles.checkoutBoxContent}>
                <h5>
                  Quantity:{" "}
                  <select
                    name="productCount"
                    value={product?.count}
                    onSelect={changeCount}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </h5>
                <h5>
                  Size:{" "}
                  <span>
                    <select value={product?.size} onSelect={changeSize}>
                      <option value="">S</option>
                      <option value="">M</option>
                      <option value="">L</option>
                      <option value="">XL</option>
                    </select>
                  </span>
                </h5>
                <h5>
                  Color:{" "}
                  <span>
                    <select value={product?.color} onSelect={changeColor}>
                      <option value="">Red</option>
                      <option value="">Blue</option>
                      <option value="">Green</option>
                      <option value="">Yellow</option>
                    </select>
                  </span>
                </h5>
                {/* Buy now button */}
                <button className={styles.buyNowBtn}>Buy Now</button>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </Row>
  </Container>
);
}
export default ProductInfo;
