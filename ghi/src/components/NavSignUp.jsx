import React from "react";
import { NavLink } from "react-router-dom";

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
                  <form action="/accounts">
                    <button className="btn-sign" type="submit">
                      Sign in
                    </button>
                  </form>
                </li>
                <li>
                  <form action="/accounts/signup">
                    <button className="btn" type="submit">
                      Join Now
                    </button>
                  </form>
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
