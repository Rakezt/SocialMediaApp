import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordagain = useRef();
  const date = useRef();
  const city = useRef();
  const hometown = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordagain.current.value) {
      password.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        date: date.current.value,
        city: city.current.value,
        hometown: hometown.current.value,
      };
      try {
        await axios.post(
          `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/auth/register`,
          user
        );
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Kammanahalli POST</h3>
          <span className="loginDesc">
            connect with friends and the world around you with Kammanahalli POST
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              type="text"
              className="loginInput"
              ref={username}
              required
            />
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              required
              minLength="6"
            />
            <input
              placeholder="Password Again"
              type="password"
              className="loginInput"
              ref={passwordagain}
              minLength="6"
              required
            />
            <input
              placeholder="Date of Birth"
              type="date"
              className="loginInput"
              ref={date}
              required
            />
            <input
              placeholder="City"
              type="text"
              className="loginInput"
              ref={city}
              required
            />
            <input
              placeholder="HomeTown"
              type="text"
              className="loginInput"
              ref={hometown}
              required
            />

            <button className="loginButton">Sign Up</button>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
