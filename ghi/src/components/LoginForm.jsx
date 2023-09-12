import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from "react";
import NavSignUp from "./NavSignUp";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/workouts");
    }
    if (!token && click) {
      setTimeout(function () {
        setError(true);
      }, 2000);
    }
  }, [token, click, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClick(true);
    await login(email, password);
    e.target.reset();
  };

  return (
    <div id="login">
      <NavSignUp />
      <div className="card-form">
        <div className="login-header">
          <i className="bi bi-person-circle"></i>
          <h2>Sign in</h2>
          {error ? (
            <p className="alert alert-danger">
              Login Failed!<br></br>Wrong email or password!
            </p>
          ) : null}
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="login-middle">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="text"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input className="btn btn-login-page" type="submit" value="Login" />
          </div>
        </form>
        <div className="login-header login-footer">
          <p>Do not have an Account? Create an Account</p>
          <Link to="/accounts/signup">
            <button className="btn btn-sing-up" type="submit">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
