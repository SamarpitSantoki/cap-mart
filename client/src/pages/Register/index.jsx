import Header from "../../components/Header";
import style from "./index.module.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/auth/register",
        {
          name,
          email,
          password,
          phone,
        }
      );
      toast.success("Registered Succesfully");
      sessionStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      if (e.response.data) {
        toast.error(e.response.data.errors[0].msg);
      } else {
        toast.error(e.message);
      }
      setIsLoading(false);
    }
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
            {/* check password and confirm password */}
            {confirmPassword && password !== confirmPassword && (
              <p className="text-danger">Password does not match</p>
            )}
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className={style.login__signInButton}
              onClick={(e) => {
                setIsLoading(true);
                handleSubmit(e);
              }}
            >
              {isLoading ? (
                <div className="spinner-border text-light" role="status"></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <Link to={"/login"} className={style.login__registerButton}>
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
}
export default Register;
