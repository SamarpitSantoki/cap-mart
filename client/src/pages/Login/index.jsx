import Header from "../../components/Header";
import style from "./index.module.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/auth/login",
        {
          email,
          password,
        }
      );
      console.log(res.data);
      toast.success("Logged in Succesfully");
      sessionStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
      setIsLoading(false);
      console.log(res.data);
    } catch (e) {
      console.log(e);
      if (e.response.data) {
        toast.error(e.response.data.errors[0]?.msg);
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
          <h3>Sign in</h3>
          <form
            className={style.login__form}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label className="fs-6">E-mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="fs-6">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className={style.login__signInButton}
              onClick={(e) => {
                setIsLoading(true);
                handleSubmit(e);
              }}
            >
              {isLoading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <Link to={"/register"} className={style.login__registerButton}>
            Create your Account
          </Link>
        </div>
      </div>
    </>
  );
}
export default Login;
