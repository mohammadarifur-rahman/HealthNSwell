import { useEffect, useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";


function ViewExercise() {
  const [exercises, setExercises] = useState([]);
  const [currentExerciseEdit, setCurrentExerciseEdit] = useState(false);
  const { token } = useToken();

  // ----------- START OF GET request to exercises --------------
    // y u do dis send only one request
  const getExercises = async () => {
      // do not hardcode id
    const exercisesUrl = `${process.env.REACT_APP_API_HOST}/api/exercises/1/`;
    const response = await fetch(exercisesUrl, { credentials: "include" });
    const exercises = await response.json();
    setExercises(exercises);
  };
  useEffect(() => {
    getExercises();
  }, []);
  // ----------- END OF GET request to exercises --------------


  // ----------- START OF DELETE request to exercises --------------
  async function handleDeleteExercise(exercise_id) {
    const exerciseUrl = `${process.env.REACT_APP_API_HOST}/api/exercises/${exercise_id}/`;
    const exerciseFetchOptions = {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const exerciseResponse = await fetch(exerciseUrl, exerciseFetchOptions);
    if (exerciseResponse.ok) {
      console.log("delete successful");
    }
  }
  // ----------- END OF DELETE request to exercises --------------

  // ----------- START OF PUT request to exercises --------------
  // got rid of e -- error on frontend
  const handleEditExercise = async (id, name, sets, reps, weight, restBetweenSets, restBetweenExercises, workout) => {
    const data = {};
    data.name = name;
    data.sets = sets;
    data.reps = reps;
    data.weight = weight;
    data.rest_between_sets = restBetweenSets;
    data.rest_between_exercises = restBetweenExercises;
    data.workout = workout;

    const url = `${process.env.REACT_APP_API_HOST}/api/exercises/${id}/`;
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
  // ----------- END OF PUT request to exercises --------------

  return (
    <>
    <table className="table table-striped">
        <thead>
            <tr>
            <th scope="col">Exercise Name</th>
            <th scope="col">Sets</th>
            <th scope="col">Reps</th>
            <th scope="col">Weight</th>
            <th scope="col">Rest Between Sets</th>
            <th scope="col">Rest Between Exercises</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
          {exercises && exercises.map(exercise => {
                return (
                  <tr key={exercise.id} value={exercise.id}>
                    <td className=''>{exercise.name}</td>
                    <td className=''>{exercise.sets}</td>
                    <td className=''>{exercise.reps}</td>
                    <td className=''>{exercise.weight}</td>
                    <td className=''>{exercise.rest_between_sets}</td>
                    <td className=''>{exercise.rest_between_exercises}</td>
                    <td>
                    <div>
                      { !currentExerciseEdit ?
                      <>
                      <button type="button" className="btn btn-warning me-2" onClick={() => setCurrentExerciseEdit(true)}>Edit</button>
                      <button type="button" className="btn btn-danger ms-2" onClick={() => handleDeleteExercise(exercise.id)}>Remove</button>
                      </>
                      :
                      <>
                      <button type="button" className="btn btn-success me-2" onClick={() => handleEditExercise(
                        exercise.id,
                        exercise.name,
                        exercise.sets,
                        exercise.reps,
                        exercise.weight,
                        exercise.rest_between_sets,
                        exercise.rest_between_exercises,
                        exercise.workout
                        )}>Submit</button>
                      <button type="button" className="btn btn-warning ms-2" onClick={() => setCurrentExerciseEdit(false)}>Cancel</button>
                      </>
                      }
                    </div>
                    </td>
                  </tr>
                );
            })}
        </tbody>
    </table>
    </>
  );
}

export default ViewExercise;
