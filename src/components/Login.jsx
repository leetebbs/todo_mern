import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { IdContext } from "../App";
const Login = () => {
  const [id, setId] = useContext(IdContext);
  localStorage.setItem("userId", id);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    //get username and check password is corect if correct pass user id to context
    try {
      const response = await axios.post("https://todo-express-zeta.vercel.app/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Redirect to the Todo page after successful login
        navigate("/todo");
        setId(response.data);
        setError("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1> Welcome to Todos</h1>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit" type="submit">
            Login
          </button>
          <button className="register" onClick={() => navigate("/register")}>
            register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
