import Header from "../../components/Header";
import style from "./index.module.css";

function Register() {
  return (
    <>
      <Header />
      <div className={style.login}>
        <div className={style.login__container}>
          <h3>Sign Up</h3>
          <form className={style.login__form}>
            <label className="fs-6">Name</label>
            <input type="text" />
            <label className="fs-6">E-mail</label>
            <input type="text" />
            <label className="fs-6">Phone</label>
            <input type="text" />
            <label className="fs-6">Password</label>
            <input type="password" />
            <button type="submit" className={style.login__signInButton}>
              Create Account
            </button>
          </form>
          <button className={style.login__registerButton}>Sign In</button>
        </div>
      </div>
    </>
  );
}
export default Register;
