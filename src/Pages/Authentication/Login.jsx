import { useState, useEffect } from "react";
import styles from "./Auth.module.scss";
import loginImg from "../../assets/Images/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../Components/Card/Card";
import { login, reset_auth } from "../../Redux/Features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../Firebase/config";
import { selectPreviousURL } from "../../Redux/Features/cartslice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth)

  
  

   const loginUser  = async (e) => {
    e.preventDefault();
    if (!email || !password){
      return toast.error("All fields are required")
    }
    
    if (password.length < 6) {
      return toast.error("Password must be up to 6")
    }
   

    const userData = {
      email,
      password,
    }
    await dispatch(login(userData))
   };

   useEffect(() => {
    if(isSuccess && isLoggedIn) {
      navigate("/")
    }
    dispatch(reset_auth())
   }, [isLoading, isLoggedIn, isSuccess, dispatch, navigate])

    // Login with Goooglr
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const redirectUser = () => {
    if (selectPreviousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };
  
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;