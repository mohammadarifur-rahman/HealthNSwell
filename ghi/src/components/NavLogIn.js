import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Home.css";
import useToken from "@galvanize-inc/jwtdown-for-react";

function NavLogIn() {
  const { logout } = useToken();
  const [first, setFirst] = useState("");

  const handleFirst = async (e) => {
    const tokenUrl = `${process.env.REACT_APP_API_HOST}/token`;
    const tokenResponse = await fetch(tokenUrl, { credentials: "include" });
    const tokenData = await tokenResponse.json();
    const first_name = tokenData.account.first_name;
    setFirst(first_name);
  };

  useEffect(() => {
    handleFirst();
  }, []);

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
                  <Link className="nav-link" to="/workouts/view">
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
                        <Link className="dropdown-item" to="#">
                          {" "}
                          <i className="bi bi-person-fill"></i>My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="accounts/edit">
                          {" "}
                          <i className="bi bi-gear"></i>Update Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={logout}>
                          {" "}
                          <i className="bi bi-door-open"></i>Log out
                        </Link>
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
