import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateTaskPage = () => {
  const { task_id } = useParams();
  const taskID = Number(task_id); // Convert to a number

  const [taskData, setTaskData] = useState({ Name: "", Description: "" });
  const [updatedTaskName, setUpdatedTaskName] = useState("");
  const [updatedTaskDesc, setUpdatedTaskDesc] = useState("");

  const [isLoading, setIsLoading] = useState(false); // stores loading state
  const [error, setError] = useState(null); // stores error if there is any

  const axiosInstance = axios.create({
    baseURL:
      "https://abbas-sleiman-webapp-ewe4gubrauhye4h2.eastus-01.azurewebsites.net",
    withCredentials: true,
  });

  // Update task
  const updateTask = async (e) => {
    e.preventDefault();

    const response = await axiosInstance.put(
      `https://abbas-sleiman-webapp-ewe4gubrauhye4h2.eastus-01.azurewebsites.net/update-task/${taskID}`,
      {
        updatedTaskName,
        updatedTaskDesc,
      }
    );
    try {
      if (response.status === 200) {
        console.log("Tasks updated:", response.data);
        location.reload();
      } else {
        console.log("Error response:", response);
        setError("Failed to update task.");
      }
    } catch (error) {
      console.log("Error response:", response);
      setError("Failed to update task.");
    }
  };

  const getTaskInfo = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `https://abbas-sleiman-webapp-ewe4gubrauhye4h2.eastus-01.azurewebsites.net/get-task/${taskID}`
      );

      try {
        if (response.status === 200) {
          console.log("Task data received:", response.data.task_data);
          setTaskData(response.data.task_data);
        } else {
          console.log("Error response:", response);
        }
      } catch (error) {
        setIsLoading(false);
        setError("Error retrieving task info");
        console.log("Error response:", error);
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      setError("Error retrieving task info");
      console.log("Error response:", error);
    }
  };

  useEffect(() => {
    getTaskInfo();
  }, [task_id]);

  return (
    <div className="task-page">
      {/* Display loading spinner when data is loading */}
      {isLoading ? (
        <p>Loading task info...</p> // Show loading text or spinner
      ) : error ? (
        <p>{error}</p> // Show error if there is an issue with fetching data
      ) : taskData === null || taskData === undefined ? (
        <p>Task retrieval error</p> // Display message when no tasks are found
      ) : (
        <div className="form-container">
          <h2>Update task {task_id}</h2>
          <div className="task-info-box">
            <p>{taskData.Name}</p>
            <p>{taskData.Description}</p>
          </div>
          <form action="" className="task-update-form">
            <input
              className="input name"
              type="text"
              name="name"
              id="name"
              placeholder="Task Name"
              required
              value={updatedTaskName}
              onChange={(e) => {
                setUpdatedTaskName(e.target.value);
              }}
            />
            <input
              className="input description"
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={updatedTaskDesc}
              onChange={(e) => {
                setUpdatedTaskDesc(e.target.value);
              }}
            />
            <button type="submit" onClick={updateTask}>
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateTaskPage;
