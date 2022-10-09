import { Container } from "react-bootstrap";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <Container>
      <div className={styles.navbar}>
        <div className={styles.title}>CAP SHOP</div>
        <div className={styles.search}>
          {/* icon of search */}
          <img
            height={20}
            src="https://img.icons8.com/ios/50/0000ff/search--v1.png"
            alt="search"
          />
          <input type="text" placeholder="Search" />
        </div>
        <div className={styles.nav}>
          <Link to={"/"}>Home</Link>
          <span
            style={{
              padding: "0 10px",
            }}
          >
            <Link to={"/login"}>Login</Link>
            <span
              style={{
                padding: "0 2px",
              }}
            >
              /
            </span>
            <Link to={"/register"}>Register</Link>
          </span>
        </div>
      </div>
    </Container>
  );
}

export default Header;
