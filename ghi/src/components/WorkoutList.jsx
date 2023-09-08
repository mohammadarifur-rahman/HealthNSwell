import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";
import NavLogIn from "./NavLogIn";
import "./Home.css";

function WorkoutList({ setCurrentWorkout }) {
  const [workoutList, setWorkoutList] = useState([]);

  async function loadWorkoutList() {
    const tokenUrl = `${process.env.VITE_REACT_APP_API_HOST}/token`;
    const tokenResponse = await fetch(tokenUrl, { credentials: "include" });
    const tokenData = await tokenResponse.json();
    const accountId = tokenData.account.id;

    const url = `http://localhost:8000/api/workouts/${accountId}`;
    const response = await fetch(url, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setWorkoutList(data);
    }
  }

  useEffect(() => {
    loadWorkoutList();
  }, []);

  return (
    <div id="workout">
      <NavLogIn />
      <div className="card-form-workout">
        <div className="container">
          <h1>WorkOut List</h1>
          <div className="row">
            {workoutList &&
              workoutList.map((workout) => (
                <WorkoutCard
                  setCurrentWorkout={setCurrentWorkout}
                  workout={workout}
                  key={workout.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutList;
