import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Home.css";

function NavSignUp() {
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
                <li>
                  <Link className="btn btn-sign" to="/accounts">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link className="btn" to="/accounts/signup">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}

export default NavSignUp;
