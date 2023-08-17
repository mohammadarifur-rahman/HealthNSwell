import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AccountForm from "./components/AccountForm";
import LoginForm from "./components/LoginForm";
import EditAccount from "./components/EditAccount";
import WorkoutList from "./components/WorkoutList";
import CreateWorkout from "./components/CreateWorkout";
import ViewWorkout from "./components/ViewWorkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="accounts">
            <Route index element={<LoginForm />} />
            <Route path="signup" element={<AccountForm />} />
            <Route path="edit" element={<EditAccount />} />
          </Route>

          <Route path="workouts">
            <Route index element={<WorkoutList />} />
            <Route path="create" element={<CreateWorkout />} />
            <Route path="view" element={<ViewWorkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
