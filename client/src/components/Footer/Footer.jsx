import { Col, Row } from "react-bootstrap";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <Row>
        <Col>
          <Row>
            <h4>Information</h4>
          </Row>
          <span>
            <Row>
              <a href="#">About Us</a>
            </Row>

            <Row>
              <a href="">Brands</a>
            </Row>
            <Row>
              <a href="">Show Rooms</a>
            </Row>
            <Row>
              <a href="">Local Store</a>
            </Row>
            <Row>
              <a href="">Site Map</a>
            </Row>
          </span>
        </Col>
        <Col>
          <Row>
            <h4>Information</h4>
          </Row>
          <span>
            <Row>
              <a href="#">Your Account</a>
            </Row>

            <Row>
              <a href="">Sign In</a>
            </Row>
            <Row>
              <a href="">Register</a>
            </Row>
            <Row>
              <a href="">View Cart</a>
            </Row>
            <Row>
              <a href="">Track an Order</a>
            </Row>
          </span>
        </Col>
        <Col>
          <Row>
            <h4
              style={{
                textAlign: "right",
              }}
            >
              Contact Details
            </h4>
          </Row>
          <span>
            <Row>
              <a
                href="#"
                style={{
                  textAlign: "right",
                }}
              >
                Head Office: Avenue Fashion. 180-182 Regent Street, London
              </a>
            </Row>
            <Row>
              <a
                href="#"
                style={{
                  textAlign: "right",
                }}
              >
                Head Office: Avenue Fashion. 180-182 Regent Street, London
              </a>
            </Row>
            <Row>
              <a
                href="#"
                style={{
                  textAlign: "right",
                }}
              >
                Telephone: 0123-456-789
              </a>
            </Row>
            <Row>
              <a
                href="#"
                style={{
                  textAlign: "right",
                }}
              >
                Email: support@website.com
              </a>
            </Row>
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
