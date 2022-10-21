import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";

const Product = ({ data, addToCart }) => {
  return (
    <>
      <div className={[styles.groupDiv]}>
        <img
          className={styles.rectangleIcon1}
          width="100%"
          src={
            process.env.REACT_APP_IMAGE_URL +
            "/static/product_images/" +
            data?._id +
            "/" +
            data?.image?.[0]
          }
          alt="product"
        />
        <Link to={"product/" + data._id}>
          <div className={styles.grayCapOfCottonFabric}>{data.name}</div>
        </Link>
        <Button
          variant="outline-primary"
          style={{
            fontWeight: "bold",
            fontSize: "19px",
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}
          onClick={() => addToCart(data)}
        >
          +
        </Button>
        <div className={styles.div}>₹ {data.displayPrice}</div>
        <div className={styles.saleDiv}>sale</div>
      </div>
      {/* <div className="bg-white p-2">
        <img
          style={{
            margin: "auto",
            minHeight: "8rem",
            backgroundColor: "red",
          }}
          width="100%"
          src={
            process.env.REACT_APP_IMAGE_URL +
            "/static/product_images/" +
            data?._id +
            "/" +
            data?.image?.[0]
          }
        />
        <Link to={"product/" + data._id}>
          <div className="lead">{data.name}</div>
        </Link>
        <Row className="m-auto mt-1 items-center text-center">
          <Col xs={6}>
            <div className="h3 text-primary">₹{data.displayPrice}</div>
          </Col>
          <Col>
            <button
              className="btn btn-outline-primary rounded py-0.5 py-md-auto"
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              onClick={() => addToCart(data)}
            >
              +
            </button>
          </Col>
        </Row>
      </div> */}
    </>
  );
};

export default Product;
