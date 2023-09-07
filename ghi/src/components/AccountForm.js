import React, { useState } from "react";
import NavSignUp from "./NavSignUp";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function BootstrapInput(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function AccountForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.email = email;
    data.first_name = firstname;
    data.last_name = lastname;
    data.password = password;
    const accountUrl = `${process.env.REACT_APP_API_HOST}/api/accounts`;
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const accountResponse = await fetch(accountUrl, fetchOptions);
    if (accountResponse.ok) {
      e.target.reset();
      login(email, password);
      navigate("/");
    }
  };

  return (
    <div id="login">
      <NavSignUp />
      <div className="card-form">
        <div className="login-header">
          <i className="bi bi-person-circle"></i>
          <h2>Sign Up</h2>
        </div>
        <form
          className="row login-middle-row"
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* <div className="form-row"> */}
          <div className="column">
            <BootstrapInput
              id="firstname"
              placeholder="firstname"
              labelText="Your first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
            />
          </div>
          <div className="column">
            <BootstrapInput
              id="lastname"
              placeholder="lastname"
              labelText="Your last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
            />
          </div>
          <div className="column">
            <BootstrapInput
              id="password"
              placeholder="password"
              labelText="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
            />
          </div>
          <div className="column">
            <BootstrapInput
              id="email"
              placeholder="email"
              labelText="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </div>
          {/* </div> */}
          <div className="account-submit">
            <input
              className="btn btn-sing-up btn-login-page"
              type="submit"
              value="Create"
            />
          </div>
        </form>
        <div className="login-header login-footer">
          <p>Already have an Account?</p>
          <form action="/accounts">
            <button className="btn btn-sing-up" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountForm;
