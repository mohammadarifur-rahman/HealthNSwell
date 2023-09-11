import React, { useState } from "react";
import NavLogIn from "./NavLogIn";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function BootstrapInput(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function WorkoutForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [activity_name, setActivityName] = useState("");
  const navigate = useNavigate();
  const { token } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.name = name;
    data.description = description;
    data.duration = duration;
    data.activity_name = activity_name;
    const tokenUrl = `${process.env.VITE_REACT_APP_API_HOST}/token`;
    const tokenResponse = await fetch(tokenUrl, { credentials: "include" });
    const tokenData = await tokenResponse.json();
    const accountId = tokenData.account.id;
    data.account = accountId;
    const workoutUrl = `${process.env.VITE_REACT_APP_API_HOST}/api/workouts/`;
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const workoutResponse = await fetch(workoutUrl, fetchOptions);
    if (workoutResponse.ok) {
      e.target.reset();
      navigate("/workouts");
    }
  };

  return (
    <div id="login">
      <NavLogIn />
      <div className="card-form">
        <div className="login-header">
          <i className="bi bi-person-circle"></i>
          <h2>Create a workout</h2>
        </div>
        <form
          className="row login-middle-row"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="column">
            <BootstrapInput
              id="workoutname"
              placeholder="Beginner Full Body Circuit"
              labelText="Workout name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
          <div className="column">
            <BootstrapInput
              id="description"
              placeholder="Warm-up, Circuit & Cooldown "
              labelText="Workout description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </div>
          <div className="column">
            <BootstrapInput
              id="workoutduration"
              placeholder="1hr 15mins"
              labelText="Workout duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              type="text"
            />
          </div>
          <div className="column">
            <BootstrapInput
              id="activityname"
              placeholder="Full Body Circuit"
              labelText="Activity name"
              value={activity_name}
              onChange={(e) => setActivityName(e.target.value)}
              type="text"
            />
          </div>
          <div className="account-submit">
            <input
              className="btn btn-sing-up btn-login-page"
              type="submit"
              value="Create"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default WorkoutForm;
