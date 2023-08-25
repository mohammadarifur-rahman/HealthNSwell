import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ViewExercise from "./ViewExcercise";


// ------------- view workout function -------------
function ViewWorkout() {
  const [workout, setWorkout] = useState("");
  const [editWorkout, setEditWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [workoutActivityName, setWorkoutActivityName] = useState("");
  const { token } = useToken();
  // ---------------------------------------------

  // ------------- get request for workout -------------
  const getWorkout = async (e) => {
      // do not hardcode id
    const workoutUrl = `${process.env.REACT_APP_API_HOST}/api/workouts/3/`;
    const response = await fetch(workoutUrl, { credentials: "include" });
    const workout = await response.json();
    setWorkout(workout);
    setWorkoutName(workout.name);
    setWorkoutDuration(workout.duration);
    setWorkoutDescription(workout.description);
    setWorkoutActivityName(workout.activity_name);
  };
  useEffect(() => {
    getWorkout();
  }, []);
  // ---------------------------------------------

  // ------------- put request to workout -------------
  const handleEditWorkout = async (e) => {
    e.preventDefault();
    const data = {};
    data.name = workoutName;
    data.duration = workoutDuration;
    data.description = workoutDescription;
    data.activity_name = workoutActivityName;
    data.account = workout.account;

    const url = `${process.env.REACT_APP_API_HOST}/api/workouts/${workout.id}/`;
    const fetchOptions = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      console.log(response);
    }
  };
  // ---------------------------------------------

  return (
    <>
    {/* ------ if edit workout is true ------ */}
      <div className="container">
        <div className="row">
          <div className="col"></div>

          <div className="col-10 border border-dark rounded-5 p-4 my-5">
            <div className="input-group input-group-lg mb-3">
              <i className="bi bi-check-circle  d-flex align-self-center fs-1 me-2"></i>
              <i className="bi bi-x-circle  d-flex align-self-center fs-1 me-3"></i>
              <input type="text" className="form-control text-center fs-1 rounded-5 bg-secondary bg-opacity-25" placeholder="Workout"/>
              <i onClick={(e) => handleEditWorkout(e)} className="bi bi-check-circle text-success d-flex align-self-center fs-1 ms-3"></i>
              <i onClick={() => setEditWorkout(false)} className="bi bi-x-circle text-danger d-flex align-self-center fs-1 ms-2"></i>
            </div>

            <div className="input-group input-group-md mb-3">
              <input type="text" className="form-control text-center fs-2 rounded-5 bg-secondary bg-opacity-25" placeholder="Activity"/>
            </div>

            <div className="input-group input-group-md mb-3">
              <input type="text" className="form-control text-center fs-2 rounded-5 bg-secondary bg-opacity-25" placeholder="Duration"/>
            </div>

            <div className="input-group input-group-sm">
              <textarea className="form-control text-center fs-4 rounded-5 bg-secondary bg-opacity-25" placeholder="Description"></textarea>
            </div>
          </div>

          <div className="col"></div>
        </div>
      </div>

      {/*  END OF edit workout */}
      <ViewExercise />
    </>
  );
}

export default ViewWorkout;
