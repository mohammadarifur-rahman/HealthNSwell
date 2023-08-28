import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";
import "./Home.css";

const cardStyles = {
  container: {
    boxShadow: "5px 2px 10px 2px #cec7c759",
    alignItems: "center",
    padding: 20,
    borderRadius: 0,
  },
};

function WorkoutList({setCurrentWorkout}) {
  const [workoutList, setWorkoutList] = useState([]);

  async function loadWorkoutList() {
    const url = "http://localhost:8000/api/workouts/";
    const response = await fetch(url, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setWorkoutList(data);
    }
  }

  useEffect(() => {
    loadWorkoutList();
  }, []);

  return (
    <>
      <div className="container">
        <h1>WorkOut List</h1>
        <div className="row">
          {workoutList &&
            workoutList.map((workout) => (
              <WorkoutCard setCurrentWorkout={setCurrentWorkout} workout={workout} key={workout.id}/>
              // <div key={workout.id} className="col-md-4 mb-4">
              //   <div className="card">
              //     <div className="card-body" style={cardStyles.container}>
              //       <h5 className="card-title">{workout.name}</h5>
              //       <p className="card-text">
              //         Description: {workout.description}
              //       </p>
              //       <ul className="list-group list-group-flush">
              //         <li className="list-group-item">
              //           Duration: {workout.duration}
              //         </li>
              //         <li className="list-group-item">
              //           Activity Name: {workout.activity_name}
              //         </li>
              //       </ul>
              //     </div>
              //   </div>
              // </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default WorkoutList;
