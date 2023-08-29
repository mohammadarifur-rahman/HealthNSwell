import { useNavigate } from "react-router-dom";

function WorkoutCard({setCurrentWorkout, workout}) {
    const navigate = useNavigate();
    function handleSelectCard(selection) {
        setCurrentWorkout(selection);
        navigate("/workouts/view")
    }

    return (
        <div className="col">
            <div className="card text-center mb-3 shadow">
                <div className="card-body">
                    <h5 className="card-title">{workout.name}</h5>
                    <p className="card-text">{workout.activity_name} • {workout.duration}</p>
                    <p className="card-text">{workout.description}</p>
                    <button onClick={() => handleSelectCard(workout)}>I'm a workout!</button>
                </div>
            </div>
        </div>
    );
}
export default WorkoutCard;
