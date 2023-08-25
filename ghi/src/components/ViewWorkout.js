import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";


// ------------- bootstrap input form -------------
function BootstrapInput (props) {
const { id, placeholder, labelText, value, onChange, type } = props;
return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">{labelText}</label>
      <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder} />
    </div>
  );
}
// ---------------------------------------------

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
    console.log(data);
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
      {editWorkout ? (
        <>
          {/* ------ START OF if edit workout is true ------ */}
            <form>
              <div className="mx-5">
                <BootstrapInput
                id="workoutName"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                type="text" />
              </div>
              <div className="mx-5">
                <BootstrapInput
                id="workoutDuration"
                value={workoutDuration}
                onChange={(e) => setWorkoutDuration(e.target.value)}
                type="text" />
              </div>
              <div className="mx-5">
                <BootstrapInput
                id="workoutActivityName"
                value={workoutActivityName}
                onChange={(e) => setWorkoutActivityName(e.target.value)}
                type="text" />
              </div>
              <div className="mx-5">
                <BootstrapInput
                id="workoutDescription"
                value={workoutDescription}
                onChange={(e) => setWorkoutDescription(e.target.value)}
                type="text" />
              </div>
            </form>

            <i onClick={(e) => handleEditWorkout(e)} className="bi bi-check-circle fs-2 ms-5"></i>
            <i onClick={() => setEditWorkout(false)} className="bi bi-x-circle fs-2 ms-2"></i>
          {/* ------ END OF if edit workout is true ------ */}
        </>
      ) : (
        <>
          {/* ------ START OF if edit workout is false ------ */}
            <form className="">
              <div className="mx-5 mb-4 mt-4">
              <div className="input-group">
                <input type="text" className="form-control bg-white" placeholder={workout.name} disabled/>
                <div className="input-group-append">
                  <i onClick={() => setEditWorkout(true)} className="bi bi-pencil fs-2"></i>
                </div>
              </div>
              </div>

              <div className="mx-5 mb-4 mt-4">
              <div className="input-group">
                <input type="text" className="form-control bg-white" placeholder={workout.duration} disabled/>
                <div className="input-group-append">
                  <i onClick={() => setEditWorkout(true)} className="bi bi-pencil fs-2"></i>
                </div>
              </div>
              </div>

              <div className="mx-5 mb-4 mt-4">
              <div className="input-group">
                <input type="text" className="form-control bg-white" placeholder={workout.activity_name} disabled/>
                <div className="input-group-append">
                  <i onClick={() => setEditWorkout(true)} className="bi bi-pencil fs-2"></i>
                </div>
              </div>
              </div>

              <div className="mx-5 mb-4 mt-4">
              <div className="input-group">
                <input type="text" className="form-control bg-white" placeholder={workout.description} disabled/>
                <div className="input-group-append">
                  <i onClick={() => setEditWorkout(true)} className="bi bi-pencil fs-2"></i>
                </div>
              </div>
              </div>
            </form>
            {/* ------ END OF if edit workout is false ------ */}
        </>
      )}
    </>
  );
}

export default ViewWorkout;
