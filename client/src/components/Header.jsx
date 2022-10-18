import { Container } from "react-bootstrap";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
function Header({ text, handleSearchFilter }) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    window.location = "/login ";
  };
  return (
    <Container>
      <div className={styles.navbar}>
        <Link to={"/"}>
          <div className={styles.title}>
            <img src="/logo.png" alt="" width={"19%"} />
            RHeadMaker
          </div>
        </Link>
        <div className={styles.search}>
          {/* icon of search */}

          <input
            className={styles.inputStyle}
            type="text"
            value={text}
            placeholder="Search"
            onChange={(e) => handleSearchFilter(e)}
          />
        </div>
        <div className={styles.nav}>
          <Link to={"/"}>Home</Link>
          {user ? (
            <>
              {/* <Link to={"/profile"}>Profile</Link> */}
              <Link to={"/cart"}>Cart</Link>
              <Link onClick={handleLogout} to={"#"}>
                Logout
              </Link>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </Container>
  );
}

export default Header;
