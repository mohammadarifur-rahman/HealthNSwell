import React from "react";
import NavSignUp from "./NavSignUp";
import ExampleWorkout from "./ExampleWorkout";
import "./Home.css";

function Home() {
  return (
    <div className="App">
      <NavSignUp />
      <section id="banner">
        <div className="container">
          <div className="banner-title-div">
            <p className="banner-title">Welcome to our Website</p>
            <p>
              Placeholder text<i className="bi bi-pencil"></i>
            </p>
            <form action="#">
              <button className="btn-sing-up" type="submit">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </section>
      <ExampleWorkout />
    </div>
  );
}

export default Home;
