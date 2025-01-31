import React from "react";
import { Link } from "react-router-dom";
import NavSignUp from "./NavSignUp";
import ExampleWorkout from "./ExampleWorkout";
import "./Home.css";
import NavLogIn from "./NavLogIn";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Home() {
  const { token } = useToken();
  return (
    <div className="App">
      {token ? <NavLogIn /> : <NavSignUp />}
      <section id="banner">
        <div className="container">
          <div className="banner-title-div">
            <p className="banner-title">Welcome to Health and Swollenness</p>
            <div className="banner-text">
              <h4 className="fw-bold shadow-lg">
                Get ready to take control of your fitness journey like never
                before! Our user-friendly web application is your one-stop
                destination for creating and managing personalized workout
                routines tailored to your fitness goals.
              </h4>
            </div>
            <Link to="/accounts">
              <button className="btn btn-sing-up" type="submit">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </section>
      <ExampleWorkout />
    </div>
  );
}

export default Home;
