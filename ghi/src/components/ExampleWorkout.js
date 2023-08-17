import React from 'react';
import './Home.css';
import AboutUS from "./img/AboutUs.png"
import SampleWorkout from "./img/SampleWorkout.png"
import DigitalJournal from "./img/DigitalJournal.png"

function ExampleWorkout() {
  return (
    <div className="testimonial">
      <div className="card">
        <div className="layer"></div>
        <div className="content">
          <div className="image">
            <img src={AboutUS} alt="about us icon"/>
          </div>
          <h2>About Us</h2><br></br>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>

          <div className="details">
            <h2>Some Text</h2>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="layer"></div>
        <div className="content">
          <div className="image">
            <img src={DigitalJournal} alt="journal icon"/>
          </div>
          <h2>Digital Journal</h2><br></br>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>

          <div className="details">
            <h2>Some Text</h2>
          </div>
          </div>
      </div>

      <div className="card">
        <div className="layer"></div>
        <div className="content">
          <div className="image">
            <img src={SampleWorkout} alt="workout icon"/>
          </div>
          <h2>Sample Workout</h2><br></br>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
          <div className="details">
            <h2>Some Text</h2>
          </div>
          </div>
      </div>
    </div>
  );
}

export default ExampleWorkout;
