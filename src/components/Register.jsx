import { useState } from "react";
import axios from 'axios';
import '../styles/register.css'
import {useNavigate} from 'react-router-dom';

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // async function create ()  {
  //   try {
  //     await axios.post(`http://localhost:3000/newUser`, {
  //       name: username,
  //       email: email,
  //       password: password,
  //     });
  //     // console.log("result", res);
  //     console.log("new user created");
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
  // }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://todo-express-zeta.vercel.app/newUser', {
        name: username,
        email: email,
        password: password,
      });
      
      if (response.status === 200) {
        console.log("ok");
        navigate('/');
      } else if(response.status === 400){
        console.log("400");
      }
      console.log(response.data.message); // Output server response message
    } catch (error) {
      console.error('Error:', error.response.data.message);
      setError(error.response.data.message);
    }
  };


  return (
    <div className="login-container">
      <h1>Register</h1>
      {/* <button onClick={() => create()}>reg</button> */}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
          <button className="submit" type="submit">Register</button>
          {/* <button className="register" onClick={() => navigate('/register')}>register</button> */}
        </form>
    </div>
  )
}

export default Register