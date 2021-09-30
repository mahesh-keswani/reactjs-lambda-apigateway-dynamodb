import React, { useState } from "react";
import axios from "axios";
import './register.css';

const REGISTER_URL =
  "https://e6fy6bfesg.execute-api.ap-south-1.amazonaws.com/dev/register";
const API_KEY = "YOUR-API-KEY";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');

  function submitHandler(event) {
    event.preventDefault();

    if ( name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
      setMessage("All fields are required");
    } else {
      const requestConfig = {
        headers: {
          "x-api-key": API_KEY
        }
      };

      const requestBody = {
        name: name,
        email: email,
        password: password
      };

      axios.post(REGISTER_URL, requestBody, requestConfig).then(response => {
        setMessage('Registration Successful, now go to login tab');
      }).catch( (error) => {
          console.log(error.response.status);
          console.log(error.response.data);
          console.log(error.response);

        if (error.response.status == '401') {
          setMessage(error.response.data);
        } else {
          setMessage('sorry....the backend server is down!! please try again later');
        }
      });
    }

    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className="jumbotron"> 
      <form method="POST" onSubmit={submitHandler} id="registerForm">
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required="required"
          className="form-control"
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required="required"
          className="form-control"
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required="required"
          className="form-control"
        />

        <button type="submit" className="btn btn-success mt-2">Register</button>
        <br />

      </form>
      <h5 className="message">{message}</h5>
    </div>
  );
}

export default Register;
