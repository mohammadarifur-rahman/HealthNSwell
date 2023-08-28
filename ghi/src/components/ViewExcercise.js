import React, {useEffect, useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";

function ViewExercise() {

  const [exercises, setExercises] = useState([]);
  const [selected, setSelected] = useState("");
  const { token } = useToken();

  async function loadExercises() {
    // do not hardcode workout id
    const url = `${process.env.REACT_APP_API_HOST}/api/exercises/1/`;
    const response = await fetch(url, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setExercises(data);
    }
  }

  useEffect(() => {
    loadExercises();
  }, []);

  async function handleDeleteExercise(id) {
    setBadReq(false);
    const exerciseUrl = `${process.env.REACT_APP_API_HOST}/api/exercises/${id}/`;
    const fetchOptions = {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    const exerciseResponse = await fetch(exerciseUrl, fetchOptions);
    if (exerciseResponse.ok) {
      setExercises(exercises.filter((exercise) => exercise.id !== id))
    }
  };

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');
  const [exerciseWeight, setExerciseWeight] = useState('');
  const [exerciseRestBetweenSets, setExerciseRestBetweenSets] = useState('');
  const [exerciseRestBetweenExercises, setExerciseRestBetweenExercises] = useState('');
  const [badReq, setBadReq] = useState(false);
  const [message, setMessage] = useState("");

  let badReqClasses = "alert alert-danger d-none";
  if (badReq) {
    badReqClasses = "alert alert-danger";
  }

  async function handleUpdateExercise(id) {
    setBadReq(false);
    id === selected ? setSelected(""): setSelected(id)
  };

  async function handleSendRequest(id, workoutId) {
    setBadReq(false);
    const data = {};
    data.name = exerciseName;
    data.sets = exerciseSets;
    data.reps = exerciseReps;
    data.weight = exerciseWeight;
    data.rest_between_sets = exerciseRestBetweenSets;
    data.rest_between_exercises = exerciseRestBetweenExercises;
    data.workout = workoutId;

    const exerciseUrl = `${process.env.REACT_APP_API_HOST}/api/exercises/${id}/`;
    const fetchOptions = {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const exerciseResponse = await fetch(exerciseUrl, fetchOptions);
    if (exerciseResponse.ok) {
      setSelected("");
      loadExercises();
    }  else {
      const json = await exerciseResponse.json();
      setMessage(json.message);
      setBadReq(true);
    }
  };

  const handleChangeExerciseName = (event) => {
    const value = event.target.value;
    setExerciseName(value);
  }

  const handleChangeExerciseSets = (event) => {
    const value = event.target.value;
    setExerciseSets(value);
  }

  const handleChangeExerciseReps = (event) => {
    const value = event.target.value;
    setExerciseReps(value);
  }

  const handleChangeExerciseWeight = (event) => {
    const value = event.target.value;
    setExerciseWeight(value);
  }

  const handleChangeExerciseRestBetweenSets = (event) => {
    const value = event.target.value;
    setExerciseRestBetweenSets(value);
  }

  const handleChangeExerciseRestBetweenExercises = (event) => {
    const value = event.target.value;
    setExerciseRestBetweenExercises(value);
  }

    return (
      <div className="container my-4">
        <h1 className="display-5 fw-bold">Exercises</h1>
        <div className={badReqClasses} id="fail-message">{message}</div>
        <table className="table table-striped">
          <thead>
            <tr className="bg-success">
              <th className="text-dark text-center">Name</th>
              <th className="text-dark text-center">Sets</th>
              <th className="text-dark text-center">Reps</th>
              <th className="text-dark text-center">Weight</th>
              <th className="text-dark text-center">Rest Between Sets</th>
              <th className="text-dark text-center">Rest Between Reps</th>
            </tr>
          </thead>
          <tbody>
            {exercises && exercises.map(exercise => {
              return (
                <tr key={exercise.id} value={exercise.id}>
                  <td>
                    { selected === exercise.id ?
                    <div className="form-group">
                      <input onChange={handleChangeExerciseName} type="text" id="name" name="name" className="form-control border-success text-center" placeholder={ exercise.name }/>
                    </div>
                    :
                    <div>
                      { exercise.name }
                    </div>
                    }
                  </td>

                  <td>
                  { selected === exercise.id ?
                    <div className="form-group">
                      <input onChange={handleChangeExerciseSets} type="number" id="sets" name="sets" className="form-control border-success text-center" placeholder={ exercise.sets }/>
                    </div>
                    :
                    <div>
                      { exercise.sets }
                    </div>
                    }
                  </td>

                  <td>
                  { selected === exercise.id ?
                    <div className="form-group">
                      <input onChange={handleChangeExerciseReps} type="number" id="reps" name="reps" className="form-control border-success text-center" placeholder={ exercise.reps } />
                    </div>
                    :
                    <div>
                      { exercise.reps }
                    </div>
                    }
                  </td>

                  <td>
                  { selected === exercise.id ?
                    <div className="form-group">
                      <input onChange={handleChangeExerciseWeight} type="number" id="weight" name="weight" className="form-control border-success text-center" placeholder={ exercise.weight } />
                    </div>
                    :
                    <div>
                      { exercise.weight }
                    </div>
                    }
                  </td>

                  <td>
                  { selected === exercise.id ?
                    <div className="form-group">
                      <input onChange={handleChangeExerciseRestBetweenSets} type="number" id="rest_between_sets" name="rest_between_sets" className="form-control border-success text-center" placeholder={ exercise.rest_between_sets } />
                    </div>
                    :
                    <div>
                      { exercise.reps }
                    </div>
                    }
                  </td>

                  <td>
                  { selected === exercise.id ?
                    <div className="form-group">
                      <input onChange={handleChangeExerciseRestBetweenExercises} type="number" id="rest_between_exercises" name="rest_between_exercises" className="form-control border-success text-center" placeholder={ exercise.rest_between_exercises } />
                    </div>
                    :
                    <div>
                      { exercise.rest_between_exercises }
                    </div>
                    }
                  </td>

                  <td>
                  <div className="d-grid gap-4 d-flex mx-4 justify-content-md-center">
                    <button className="btn w-50 btn-warning fw-bold btn-sm d-md-block text-light shadow-sm" onClick={() => handleUpdateExercise(exercise.id)} variant="outline-dark">{exercise.id === selected ? "Cancel" : "Update"}</button>

                    {exercise.id === selected ?
                    <button className="btn w-50 btn-success fw-bold btn-sm d-md-block text-light shadow-sm" onClick={() => handleSendRequest(exercise.id, exercise.workout)} variant="outline-dark">Submit</button>
                    :
                    <button className="btn w-50 btn-danger fw-bold btn-sm d-md-block text-light shadow-sm" onClick={() => handleDeleteExercise(exercise.id)} variant="outline-dark">Delete</button>
                    }
                  </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
      </table>
      </div>
    );
  }

  export default ViewExercise;
