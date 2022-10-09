import { Button } from "react-bootstrap";
import styles from "./Product.module.css";

const Product = () => {
  return (
    <div className={styles.groupDiv}>
      <img className={styles.rectangleIcon1} alt="" src="/banner.png" />
      <div className={styles.grayCapOfCottonFabric}>
        gray cap of cotton fabric
      </div>
      <Button
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
      >
        +
      </Button>
      <div className={styles.div}>$ 100</div>
      <div className={styles.saleDiv}>sale</div>
    </div>
  );
};

export default Product;
