import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const username = usernameValue;
      const email = emailValue;
      const password = passwordValue;

      const axiosInstance = axios.create({
        baseURL: "https://abbas-sleiman-webapp-ewe4gubrauhye4h2.eastus-01.azurewebsites.net",
        withCredentials: true,
      });

      // send POST req with data to the backend
      const response = await axiosInstance.post("https://abbas-sleiman-webapp-ewe4gubrauhye4h2.eastus-01.azurewebsites.net/signup", {
        username,
        email,
        password,
      });

      // internal server error
      if (response.status == 500) {
        setErrorText("Internal server Error, please try again");
      } else if (response.status == 401) {
        setErrorText("UnAuthorized Access, please try again");
      }

      console.log(response.data);
      location.reload();
    } catch (error) {
      setErrorText("Internal server Error, please try again");
    }
  };

  return (
    <div className="box signup-box">
      <h1>Sign Up</h1>
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
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="input input-email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
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
        <button onClick={handleSignUp}>Signup</button>
        <p className="error">{errorText}</p>
      </form>
    </div>
  );
};

export default SignupPage;
