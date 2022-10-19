import { Col, Row } from "react-bootstrap";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <Row className="justify-center items-center">
        <Col>
          <Row>
            <h4>Contact Details</h4>
          </Row>
          <span>
            <Row>
              <a href="#">
                Head Office: Avenue Fashion. 180-182 Regent Street, London
              </a>
            </Row>
            <Row>
              <a href="#">
                Head Office: Avenue Fashion. 180-182 Regent Street, London
              </a>
            </Row>
            <Row>
              <a href="#">Telephone: 0123-456-789</a>
            </Row>
            <Row>
              <a href="#">Email: support@website.com</a>
            </Row>
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
