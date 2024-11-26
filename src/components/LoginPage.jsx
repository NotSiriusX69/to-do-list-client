import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const loginPage = () => {
  const navigate = useNavigate();

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const username = usernameValue;
      const password = passwordValue;

      const axiosInstance = axios.create({
        baseURL:
          "https://abbas-sleiman-webapp-ewe4gubrauhye4h2.eastus-01.azurewebsites.net",
        withCredentials: true,
      });

      // Send POST request with username and password to the backend
      const response = await axiosInstance.post(
        "https://abbas-sleiman-webapp-ewe4gubrauhye4h2.eastus-01.azurewebsites.net/login",
        {
          username,
          password,
        }
      );

      console.log("test");

      // internal server error
      if (response.status == 500) {
        setErrorText("Internal server Error, please try again");
      } else if (response.status == 401) {
        setErrorText("UnAuthorized Access, please try again");
      }

      navigate("/");
      location.reload();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="box login-box">
      <h1>Login</h1>
      <p>Please fill Credentials</p>
      <form action="">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="input input-text"
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="input input-password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          required
        />
        <button onClick={handleLogin}>Login</button>
        <p className="error">{errorText}</p>
      </form>
    </div>
  );
};

export default loginPage;
