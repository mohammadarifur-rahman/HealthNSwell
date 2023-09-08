import React from "react";
import AboutUS from "./img/AboutUs.png";
import SampleWorkout from "./img/SampleWorkout.png";
import DigitalJournal from "./img/DigitalJournal.png";

function ExampleWorkout() {
  return (
    <div className="testimonial">
      <div className="card">
        <div className="layer"></div>
        <div className="content">
          <div className="image">
            <img src={AboutUS} alt="about us icon" />
          </div>
          <h2>About Us</h2>
          <br></br>
          <nav>
            <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Welcome
              </button>
              <button
                className="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Our Founders
              </button>
              <button
                className="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Shared Vision
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <p>
                At Health and Swollenness, our journey began with a shared
                passion for fitness and a burning desire to make a positive
                impact on people's lives. We are not just developers; we are
                fitness enthusiasts who believe that everyone deserves access to
                tools that empower them to lead healthier, happier lives.
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <p>
                Jane, the Fitness Guru: With years of experience as a certified
                fitness trainer, Jane has seen firsthand the transformative
                power of exercise. Her mission is to make fitness accessible to
                all, regardless of their experience level. Mike, the Tech Wiz:
                Mike's expertise in web development and user experience design
                is the driving force behind our user-friendly platform. He
                believes that technology can simplify the path to a healthier
                lifestyle.
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <p>
                Together, Jane and Mike combined their expertise to create
                Health and Swollenness. Our vision is to provide a platform that
                helps individuals conquer their fitness goals, whether it's
                running a marathon, building muscle, or simply living a more
                active life. We understand the challenges of juggling work,
                family, and fitness, and we're here to support you every step of
                the way. Our goal is to inspire and empower you to make fitness
                an enjoyable and sustainable part of your daily routine. Join us
                on this incredible journey towards better health and well-being.
                Together, we can achieve greatness.
              </p>
            </div>
          </div>
          <br></br>
        </div>
      </div>

      <div className="card">
        <div className="layer"></div>
        <div className="content">
          <div className="image">
            <img src={DigitalJournal} alt="journal icon" />
          </div>
          <h2>Digital Journal</h2>
          <br></br>
          <h5 className="border-bottom pb-2">Coming Soon</h5>
          <p className="mt-3">
            Introducing the Digital Journal: A Fitness Revolution In the world
            of fitness, we understand that the journey goes beyond physical
            metrics. That's why we're thrilled to announce the upcoming Digital
            Journal feature in our fitness routine application.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="layer"></div>
        <div className="content">
          <div className="image">
            <img src={SampleWorkout} alt="workout icon" />
          </div>
          <h2>Getting Started</h2>
          <br></br>
          <nav>
            <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-signup"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Join
              </button>
              <button
                className="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-build"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Build
              </button>
              <button
                className="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-schedule"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Schedule
              </button>
              <button
                className="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-achieve"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Achieve
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-signup"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <h5>Create your account</h5>
              <p>
                Create your account in seconds and join our vibrant fitness
                community.
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="nav-build"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <h5>Build your routine</h5>
              <p>
                Use our intuitive interface to design your workout routines.
                Select exercises, set repetitions, and duration to match your
                needs.
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="nav-schedule"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <h5>Stay on track</h5>
              <p>
                Follow your personalized workout schedule and log your sessions.
                Our reminders will help you stay consistent.
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="nav-achieve"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <h5>Achieve your goals</h5>
              <p>
                Watch as you progress towards your fitness objectives. Adjust
                your routines as needed to keep challenging yourself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExampleWorkout;
