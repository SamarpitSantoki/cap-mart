import { Col, Row } from "react-bootstrap";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <Row className="justify-center items-center">
        <Col>
          <Row className="mb-2 font-bold">
            <h4>Contact Details</h4>
          </Row>
          <span>
            <Row>
              <h4>
                Sparash recidency, Near Ashwini Bari, Opposite Prashant park
                fatehpura paldi
              </h4>
            </Row>
            <Row>
              <h4>Ahmedabad Gujarat - 380007</h4>
            </Row>
            <Row>
              <h4>Contact-9328790227</h4>
            </Row>
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
