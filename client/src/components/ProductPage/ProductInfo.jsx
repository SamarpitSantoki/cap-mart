import { Col, Container, Row } from "react-bootstrap";
import styles from "./index.module.css";
function ProductInfo() {
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
              <h1 className={styles.productTitle}>
                Pink cap for womens in winter
              </h1>
            </Row>
            <Row>
              <img
                style={{
                  margin: 10,
                }}
                src="/banner.png"
                alt=""
              />
            </Row>
          </Col>
          <Col>
            <div className={styles.imageContainer}>
              <img className="ratio-3/4" width={250} src="/banner.png" alt="" />
              <img width={250} src="/banner.png" alt="" />
              <img width={250} src="/banner.png" alt="" />
            </div>
          </Col>
        </Row>

        <Row className={styles.productInfo}>
          <Col>
            <h3 className={styles.productPrice}>$ 20.00</h3>
            <div className={styles.productDescription}>
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
                  <h5>Quantity: 5</h5>
                  <h5>
                    Size:{" "}
                    <span>
                      <select name="" id="">
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
                      <select name="" id="">
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
