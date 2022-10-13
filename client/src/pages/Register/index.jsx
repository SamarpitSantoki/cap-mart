import Header from "../../components/Header";
import style from "./index.module.css";
import axios from "axios";
import { useState } from "react";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_BASE_URL + "/auth/register", {
      name,
      email,
      password,
      phone,
    });
  };

  return (
    <>
      <Header />
      <div className={style.login}>
        <div className={style.login__container}>
          <h3>Sign Up</h3>
          <form className={style.login__form}>
            <label className="fs-6">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="fs-6">E-mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="fs-6">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label className="fs-6">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="fs-6">Confirm Password</label>
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className={style.login__signInButton}
              onClick={handleSubmit}
            >
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
