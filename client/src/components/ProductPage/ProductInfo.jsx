import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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

  async function addToCart(product) {
    let tempCart = JSON.parse(sessionStorage.getItem("cart"));
    if (!tempCart) {
      sessionStorage.setItem(
        "cart",
        JSON.stringify([{ ...product, count: 1 }])
      );
      return;
    }

    const exists = tempCart.find((item) => item._id === product._id);
    if (exists) {
      tempCart = tempCart.map((item) => {
        if (item._id === product._id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    } else {
      tempCart.push({ ...product, count: 1 });
    }

    sessionStorage.setItem("cart", JSON.stringify(tempCart));
    return;
  }

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
                  process.env.REACT_APP_IMAGE_URL +
                  "/static/product_images/" +
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
                    src={
                      process.env.REACT_APP_IMAGE_URL +
                      "/static/product_images/" +
                      product._id +
                      "/" +
                      item
                    }
                    alt=""
                  />
                );
              })}
            </div>
          </Col>
        </Row>

        <Row className={styles.productInfo}>
          <Col sm={2} md={6}>
            <span
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                color: "red",
              }}
            >
              <h3>Price : ₹ {product.displayPrice} </h3>
              {product.price !== product.displayPrice && (
                <h6>
                  <s> ₹ {product.price}</s>
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
          <Col sm={2} md={6}>
            <Row>
              <div className={styles.checkoutBox}>
                <h3>Checkout</h3>
                <div className={styles.checkoutBoxContent}>
                  <span></span>

                  <Col>
                    <h5>Quantity: </h5>
                    <select
                      name="productCount"
                      value={product?.count}
                      onSelect={changeCount}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <h5>Size: </h5>
                    <select value={product?.size} onSelect={changeSize}>
                      <option value="">S</option>
                      <option value="">M</option>
                      <option value="">L</option>
                      <option value="">XL</option>
                    </select>

                    <h5>Color: </h5>
                    <select value={product?.color} onSelect={changeColor}>
                      <option value="">Red</option>
                      <option value="">Blue</option>
                      <option value="">Green</option>
                      <option value="">Yellow</option>
                    </select>
                  </Col>
                  {/* Buy now button */}
                  <button
                    className={styles.buyNowBtn}
                    onClick={() => {
                      addToCart(product);
                      toast.success("Added to Cart");
                    }}
                  >
                    Buy Now
                  </button>
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
