import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import axios from "axios";

import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import TasksPage from "./components/TasksPage.jsx";
import UpdateTaskPage from "./components/UpdateTaskPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIsoggedIn = async () => {
    const response = await axios.get("https://abbas-sleiman-webapp-ewe4gubrauhye4h2.eastus-01.azurewebsites.net/check-session", {
      withCredentials: true,
    });

    try {
      if (response.status == "200") {
        console.log(response.data);
        setIsLoggedIn(response.data.isLoggedIn);
      } else {
        console.log(response.data);
        setIsLoggedIn(response.data.isLoggedIn);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.log(response.data);
    }
  };

  // check user's session for every page refresh
  useEffect(() => {
    checkIsoggedIn();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute is_logged={isLoggedIn}>
              <TasksPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={`/update-task/:task_id`}
          element={
            <ProtectedRoute is_logged={isLoggedIn}>
              <UpdateTaskPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <PublicRoute is_logged={isLoggedIn}>
              <LoginPage />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <PublicRoute is_logged={isLoggedIn}>
              <SignupPage />
            </PublicRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
