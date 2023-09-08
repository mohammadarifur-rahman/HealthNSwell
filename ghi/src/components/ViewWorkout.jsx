import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ViewExercise from "./ViewExercise";
import { useNavigate } from "react-router-dom";
import NavLogIn from "./NavLogIn";

function ViewWorkout({ currentWorkout }) {
  const [workout, setWorkout] = useState("");
  const [editWorkout, setEditWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [workoutActivityName, setWorkoutActivityName] = useState("");
  const navigate = useNavigate();
  const { token } = useToken();

  useEffect(() => {
    setWorkout(currentWorkout);
    setWorkoutName(currentWorkout.name);
    setWorkoutDuration(currentWorkout.duration);
    setWorkoutDescription(currentWorkout.description);
    setWorkoutActivityName(currentWorkout.activity_name);
  }, [currentWorkout]);

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
      setEditWorkout(false);
    }
  };

  function setEditWorkoutFalse() {
    setEditWorkout(false);
    setWorkout(workout);
    setWorkoutName(workout.name);
    setWorkoutDuration(workout.duration);
    setWorkoutDescription(workout.description);
    setWorkoutActivityName(workout.activity_name);
  }

  async function handleDeleteWorkout() {
    const workoutUrl = `${process.env.REACT_APP_API_HOST}/api/workouts/${currentWorkout.id}/`;
    const fetchOptions = {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const workoutResponse = await fetch(workoutUrl, fetchOptions);
    if (workoutResponse.ok) {
      navigate("/workouts");
    }
  }

  return (
    <div id="workout-view">
      <NavLogIn />
      <div className="card-form-workout">
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col-10 p-4 my-5">
              <h1 className="display-5 fw-bold text-center text-light">
                WorkOut
              </h1>
              <div className="input-group input-group-lg mb-3">
                <i className="bi bi-check-circle invisible d-flex align-self-center fs-1 me-2"></i>
                <i className="bi bi-x-circle invisible d-flex align-self-center fs-1 me-3"></i>
                {editWorkout ? (
                  <input
                    type="text"
                    className="form-control text-center fs-3 rounded-2 bg-secondary bg-opacity-25 text-light"
                    placeholder={workout.name}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    value={workoutName}
                    id="workoutName"
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control text-center fs-3 rounded-2 bg-white border-0"
                    placeholder={workout.name}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    value={workoutName}
                    id="workoutName"
                    disabled
                  />
                )}
                {editWorkout ? (
                  <>
                    <i
                      onClick={(e) => handleEditWorkout(e)}
                      className="bi bi-check-circle text-success d-flex align-self-center fs-1 ms-3"
                    ></i>
                    <i
                      onClick={(e) => setEditWorkoutFalse(e)}
                      className="bi bi-x-circle text-danger d-flex align-self-center fs-1 ms-2"
                    ></i>
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle invisible d-flex align-self-center fs-1 ms-3"></i>
                    <i
                      onClick={() => setEditWorkout(true)}
                      className="bi bi-pencil text-light d-flex align-self-center fs-1 ms-2"
                    ></i>
                  </>
                )}
              </div>
              <div className="input-group input-group-md mb-3">
                {editWorkout ? (
                  <input
                    type="text"
                    className="form-control text-center fs-4 rounded-2 bg-secondary bg-opacity-25 text-light"
                    placeholder={workout.activity_name}
                    onChange={(e) => setWorkoutActivityName(e.target.value)}
                    value={workoutActivityName}
                    id="workoutActivityName"
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control text-center fs-4 rounded-2 bg-white border-0"
                    placeholder={workout.activity_name}
                    onChange={(e) => setWorkoutActivityName(e.target.value)}
                    value={workoutActivityName}
                    id="workoutActivityName"
                    disabled
                  />
                )}
              </div>
              <div className="input-group input-group-md mb-3">
                {editWorkout ? (
                  <input
                    type="text"
                    className="form-control text-center fs-4 rounded-2 bg-secondary bg-opacity-25 text-light"
                    placeholder={workout.duration}
                    onChange={(e) => setWorkoutDuration(e.target.value)}
                    value={workoutDuration}
                    id="workoutDuration"
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control text-center fs-4 rounded-2 bg-white border-0"
                    placeholder={workout.duration}
                    onChange={(e) => setWorkoutDuration(e.target.value)}
                    value={workoutDuration}
                    id="workoutDuration"
                    disabled
                  />
                )}
              </div>
              <div className="input-group input-group-sm">
                {editWorkout ? (
                  <textarea
                    type="text"
                    className="form-control text-center fs-4 rounded-2 bg-secondary bg-opacity-25 text-light"
                    placeholder={workout.description}
                    onChange={(e) => setWorkoutDescription(e.target.value)}
                    rows="1"
                    value={workoutDescription}
                    id="workoutDescription"
                  />
                ) : (
                  <textarea
                    type="text"
                    className="form-control text-center fs-4 rounded-2 bg-white border-0"
                    placeholder={workout.description}
                    onChange={(e) => setWorkoutDescription(e.target.value)}
                    value={workoutDescription}
                    id="workoutDescription"
                    rows="1"
                    disabled
                  />
                )}
              </div>
              <div className="container center-content">
                <button
                  className="btn btn-work-out-single"
                  onClick={() => handleDeleteWorkout()}
                  type="button"
                >
                  Delete Workout
                </button>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
        <ViewExercise currentWorkout={currentWorkout} />
      </div>
    </div>
  );
}

export default ViewWorkout;
