import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const TaskBox = ({ task_id, name, description }) => {
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "https://abbas-sleiman-api-d4ckcmedgcatfugn.eastus-01.azurewebsites.net/",
    withCredentials: true,
  });

  // Delete task
  const deleteTask = async () => {
    const response = await axiosInstance.delete(
      `https://abbas-sleiman-api-d4ckcmedgcatfugn.eastus-01.azurewebsites.net/delete-task/${task_id}`
    );

    try {
      if (response.status === 200) {
        console.log("Tasks deleted:", response.data);
      } else {
        console.log("Error response:", response);
      }
    } catch (error) {
      console.log("Error response:", error);
    }
  };

  return (
    <div className="task-box">
      <p>{task_id}</p>
      <p className="task-name">{name}</p>
      <input
        className="input description"
        type="text"
        name="description"
        id="description"
        placeholder="Task description"
        value={description}
        readOnly
      />
      <button
        className="button small"
        onClick={() => navigate(`/update-task/${task_id}`)}
      >
        Edit Task
      </button>
      <button className="button small red" onClick={deleteTask}>
        Delete Task
      </button>
    </div>
  );
};

export default TaskBox;
