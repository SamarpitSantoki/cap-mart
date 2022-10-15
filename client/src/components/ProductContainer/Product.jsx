import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";

const Product = ({ data, addToCart }) => {

  return (
    <div className={styles.groupDiv}>
      <img
        className={styles.rectangleIcon1}
        alt=""
        src={"/static/product_images/" + data?._id + "/" + data?.image?.[0]}
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
  );
};

export default Product;
