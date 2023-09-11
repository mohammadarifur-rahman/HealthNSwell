import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Home.css";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function NavLogIn() {
  const { logout } = useToken();
  const [first, setFirst] = useState("");
  const navigate = useNavigate();

  const handleFirst = async (e) => {
    const tokenUrl = `${import.meta.env.VITE_REACT_APP_API_HOST}/token`;
    const tokenResponse = await fetch(tokenUrl, { credentials: "include" });
    const tokenData = await tokenResponse.json();
    if (tokenData) {
      const first_name = tokenData.account.first_name;
      setFirst(first_name);
    }
  };

  useEffect(() => {
    handleFirst();
  }, []);

  function logOut() {
    logout();
    navigate("/");
  }

  return (
    <>
      <section id="nav-bar">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              Health & Swollenness
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="btn-sign">
                  <Link className="nav-link" to="/workouts">
                    View Workouts
                  </Link>
                </li>
                <li className="btn-sign">
                  <Link className="nav-link" to="/workouts/create">
                    Create Workout
                  </Link>
                </li>
                <li>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-primary dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-person-square"></i>{" "}
                      <span>Hello, {first}</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <div
                          className="dropdown-item sudo-link"
                          onClick={() => navigate("/accounts/edit")}
                        >
                          {" "}
                          <i className="bi bi-gear"></i>Update Profile
                        </div>
                      </li>
                      <li>
                        <div
                          className="dropdown-item sudo-link"
                          onClick={logOut}
                        >
                          {" "}
                          <i className="bi bi-door-open"></i>Log out
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}

export default NavLogIn;
