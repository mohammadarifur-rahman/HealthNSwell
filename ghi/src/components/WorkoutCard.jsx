import { useNavigate } from "react-router-dom";

function WorkoutCard({ setCurrentWorkout, workout }) {
  const navigate = useNavigate();
  function handleSelectCard(selection) {
    setCurrentWorkout(selection);
    navigate("/workouts/view");
  }

  return (
    <div className="col-md-4">
      <div className="card text-center mb-4 shadow">
        <div className="card-body">
          <h5 className="card-title">
            <i className="bi bi-person-gear"></i>
            {workout.name}
          </h5>
          <p className="card-text">
            <i className="bi bi-activity"></i>
            {workout.activity_name} • <i className="bi bi-stopwatch"></i>{" "}
            {workout.duration}
          </p>
          <p className="card-text">
            <i className="bi bi-card-checklist"></i>
            {workout.description}
          </p>
          <button
            className="btn btn-work-out"
            onClick={() => handleSelectCard(workout)}
          >
            View Workout
          </button>
        </div>
      </div>
    </div>
  );
}
export default WorkoutCard;
