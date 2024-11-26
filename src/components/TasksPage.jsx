import { useEffect, useState } from "react";

import TaskBox from "./TaskBox";
import axios from "axios";

const TasksPage = () => {
  const [tasksData, setTasksData] = useState([]); // stores tasks data
  const [userName, setuserName] = useState(""); // stores user name
  const [isLoading, setIsLoading] = useState(false); // stores loading state
  const [error, setError] = useState(null); // stores error if there is any

  // Values for task creation
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const axiosInstance = axios.create({
    baseURL: "https://abbas-sleiman-api-d4ckcmedgcatfugn.eastus-01.azurewebsites.net",
    withCredentials: true,
  });

  // Handle logout functionality
  const handleLogout = async (e) => {
    try {
      const response = await axiosInstance.post("https://abbas-sleiman-api-d4ckcmedgcatfugn.eastus-01.azurewebsites.net/logout");

      // handle different response statuses
      if (response.status === 500) {
        setError("Internal server error, please try again");
      } else if (response.status === 401) {
        setError("Unauthorized access, please try again");
      }

      console.log(response.data);
      location.reload(); // reload page after logout
    } catch (error) {
      console.error("Logout error:", error);
      setError("An error occurred during logout.");
    }
  };

  // Fetch tasks from the backend
  const handleTasks = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true); // Set loading state to true before API call

      const response = await axiosInstance.get(
        "https://abbas-sleiman-api-d4ckcmedgcatfugn.eastus-01.azurewebsites.net/get-tasks"
      );

      if (response.status === 200) {
        console.log("Tasks data received:", response.data);
        setTasksData(response.data.tasks_data || []); // assuming the data is under `tasks_data` key
      } else {
        console.log("Error response:", response);
        setError("Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("An error occurred while fetching tasks.");
    } finally {
      setIsLoading(false); // Set loading state to false after the API call is finished
    }
  };

  // Create task
  const createTask = async (e) => {
    e.preventDefault();

    const response = await axiosInstance.post(
      "https://abbas-sleiman-api-d4ckcmedgcatfugn.eastus-01.azurewebsites.net/create-task",
      {
        taskName,
        taskDescription,
      }
    );

    if (response.status === 200) {
      console.log("Tasks created:", response.data);
      location.reload();
    } else {
      console.log("Error response:", response);
      setError("Failed to fetch tasks.");
    }
  };

  // get Username
  const getUsername = async (e) => {
    const response = await axiosInstance.get(
      "https://abbas-sleiman-api-d4ckcmedgcatfugn.eastus-01.azurewebsites.net/get-username"
    );

    if (response.status === 200) {
      console.log("username retrieved:", response.data);
      setuserName(response.data.username);
    } else {
      console.log("Error response:", response);
      setError("Failed to fetch username.");
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    handleTasks();
    getUsername();
  }, []);

  return (
    <div className="task-page">
      <div>
        <h1>To Do List Web App</h1>
        <h3>{userName}</h3>
      </div>

      <div className="form-container">
        <h3>Create task</h3>
        <form action="" className="task-create-form">
          <input
            className="input name"
            type="text"
            name="name"
            id="name"
            placeholder="Task Name"
            required
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          />
          <input
            className="input description"
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
          />
          <button type="submit" onClick={createTask}>
            Create
          </button>
        </form>
      </div>

      <div className="tasks-container">
        {/* Display loading spinner when data is loading */}
        {isLoading ? (
          <p>Loading tasks...</p> // Show loading text or spinner
        ) : error ? (
          <p>{error}</p> // Show error if there is an issue with fetching data
        ) : tasksData.length === 0 ? (
          <p>No tasks available</p> // Display message when no tasks are found
        ) : (
          tasksData.map((task) => (
            <TaskBox
              task_id={task.TaskID}
              name={task.Name}
              description={task.Description}
            />
          ))
        )}
      </div>

      <button className="red" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default TasksPage;
