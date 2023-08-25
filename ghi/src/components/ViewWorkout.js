import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";


// ------------- START OF view workout function -------------
function ViewWorkout() {
  const [workout, setWorkout] = useState("");
  const [editWorkout, setEditWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [workoutActivityName, setWorkoutActivityName] = useState("");
  const { token } = useToken();

  // ------------- START OF get request for workout -------------
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
  // ------------- END OF get request for workout -------------

  // ------------- START OF put request to workout -------------
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
  // ------------- END OF put request to workout -------------

// ------------- START OF bootstrap input form -------------
function BootstrapInput (props) {
const { placeholder, editable } = props;

if (editable) {
  return (
    <div className="mx-5 mb-4 mt-4">
      <div className="input-group">
        <input type="text" className="form-control bg-white"
        placeholder={placeholder} />
        <div className="input-group-append">
          <i onClick={(e) => handleEditWorkout(e)}
          className="bi bi-check-circle fs-2 ms-2"></i>
          <i onClick={() => setEditWorkout(false)}
          className="bi bi-x-circle fs-2 ms-2"></i>
        </div>
      </div>
    </div>
    );
  } else {
    return (
      <div className="mx-5 mb-4 mt-4">
        <div className="input-group">
          <input type="text" className="form-control bg-white"
          placeholder={placeholder} />
          <div className="input-group-append">
            <i onClick={() => setEditWorkout(true)}
            className="bi bi-pencil fs-2 ms-2"></i>
          </div>
        </div>
      </div>
    );
  }
}
// ------------- END OF bootstrap input form -------------

  return (
    <>
      {editWorkout ? (
        <>
          {/* ------ START OF if edit workout is true ------ */}
            <form className="">
              <BootstrapInput placeholder={workout.name} editable={true} />
              <BootstrapInput placeholder={workout.activity_name} editable={true} />
              <BootstrapInput placeholder={workout.duration} editable={true} />
              <BootstrapInput placeholder={workout.description} editable={true} />
            </form>
          {/* ------ END OF if edit workout is true ------ */}
        </>
      ) : (
        <>
          {/* ------ START OF if edit workout is false ------ */}
            <form className="">
              <BootstrapInput placeholder={workout.name} editable={false} />
              <BootstrapInput placeholder={workout.activity_name} editable={false} />
              <BootstrapInput placeholder={workout.duration} editable={false} />
              <BootstrapInput placeholder={workout.description} editable={false} />
            </form>
        </>
      )}
      {/* ------ END OF if edit workout is false ------ */}
    </>
  );
}

export default ViewWorkout;
