import React from "react";
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
            <p className="banner-title">Welcome to our Website</p>
            <p>
              Placeholder text<i className="bi bi-pencil"></i>
            </p>
            <form action="/accounts/signup">
              <button className="btn btn-sing-up" type="submit">
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
