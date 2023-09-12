import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import AccountForm from "./components/AccountForm";
import LoginForm from "./components/LoginForm";
import EditAccount from "./components/EditAccount";
import WorkoutList from "./components/WorkoutList";
import CreateWorkout from "./components/CreateWorkout";
import ViewWorkout from "./components/ViewWorkout";
import { AuthProvider, useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useLocalStorage from "./components/useLocalStorage";

function App() {
  const domain = /https?:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const baseUrl = process.env.VITE_REACT_APP_API_HOST;

  const [currentWorkout, setCurrentWorkout] = useLocalStorage("workout", "");

  function ProtectedRoute({ element }) {
    const { token } = useAuthContext();
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return element;
  }

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider baseUrl={baseUrl}>
        <Routes>
          <Route path="" element={<Home />} />

          <Route path="accounts">
            <Route index element={<LoginForm />} />
            <Route path="signup" element={<AccountForm />} />
            <Route
              path="edit"
              element={<ProtectedRoute element={<EditAccount />} />}
            />
          </Route>

          <Route path="workouts">
            <Route
              index
              element={
                <ProtectedRoute
                  element={
                    <WorkoutList setCurrentWorkout={setCurrentWorkout} />
                  }
                />
              }
            />
            <Route
              path="create"
              element={<ProtectedRoute element={<CreateWorkout />} />}
            />
            <Route
              path="view"
              element={
                <ProtectedRoute
                  element={<ViewWorkout currentWorkout={currentWorkout} />}
                />
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
