import React, { useState } from "react";
import NavLogIn from "./NavLogIn";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

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
function EditAccountForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useToken();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  async function handleDeleteAccount() {
    const tokenUrl = `${import.meta.env.VITE_REACT_APP_API_HOST}/token`;
    const tokenResponse = await fetch(tokenUrl, { credentials: "include" });
    const tokenData = await tokenResponse.json();
    const accountId = tokenData.account.id;
    const accountUrl = `${import.meta.env.VITE_REACT_APP_API_HOST}/api/accounts/${accountId}`;
    const fetchOptions = {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const accountResponse = await fetch(accountUrl, fetchOptions);
    if (accountResponse.ok) {
      navigate("/module3-project-gamma/");
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.first_name = firstName;
    data.last_name = lastName;
    data.age = age;
    data.sex = sex;
    data.height = height;
    data.weight = weight;
    data.password = password;
    data.email = email;
    const fetchOptions = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const tokenUrl = `${import.meta.env.VITE_REACT_APP_API_HOST}/token`;
    const tokenResponse = await fetch(tokenUrl, { credentials: "include" });
    const tokenData = await tokenResponse.json();
    const accountId = tokenData.account.id;
    const accountUrl = `${import.meta.env.VITE_REACT_APP_API_HOST}/api/accounts/${accountId}`;
    const accountResponse = await fetch(accountUrl, fetchOptions);
    if (accountResponse.ok) {
      e.target.reset();
      setSuccess(true);
    }
  };
  return (
    <div id="login">
      <NavLogIn />
      <div className="card-form">
        <div className="login-header">
          <i className="bi bi-person-circle"></i>
          <h2>Update Account</h2>
          {success ? (
            <p className="success">Account updated successfully!</p>
          ) : null}
        </div>
        <form
          className="row login-middle-row"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="column">
            <BootstrapInput
              id="firstName"
              placeholder="firstname"
              labelText="Your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
            />
          </div>
          <div className="column">
            <BootstrapInput
              id="lastName"
              placeholder="lastname"
              labelText="Your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              name="password"
              className="form-control"
              type="password"
              autocomplete="on"
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
          <div className="column">
            <BootstrapInput
              id="age"
              placeholder="age"
              labelText="Your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
            />
          </div>
          <div className="column">
            <BootstrapInput
              id="sex"
              placeholder="sex"
              labelText="Your sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              type="text"
            />
          </div>
          <div className="column">
            <BootstrapInput
              id="height"
              placeholder="height"
              labelText="Your height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              type="number"
            />
          </div>
          <div className="column">
            <BootstrapInput
              id="weight"
              placeholder="weight"
              labelText="Your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
            />
          </div>
          <div className="account-submit">
            <input
              className="btn btn-sing-up btn-login-page"
              type="submit"
              value="Update"
            />
          </div>
        </form>
        <div className="login-header login-footer">
          <p>Want to delete your Account?</p>
          <button className="btn" type="submit" onClick={handleDeleteAccount}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAccountForm;
