import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AccountForm from "./components/AccountForm";
import LoginForm from "./components/LoginForm";
import EditAccount from "./components/EditAccount";
import WorkoutList from "./components/WorkoutList";
import CreateWorkout from "./components/CreateWorkout";
import ViewWorkout from "./components/ViewWorkout";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const baseUrl = process.env.REACT_APP_API_HOST;

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider baseUrl={baseUrl}>
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
