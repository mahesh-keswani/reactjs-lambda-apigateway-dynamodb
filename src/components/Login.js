import React, {useState} from "react";
import axios from 'axios';
import './register.css';

const LOGIN_URL = "https://e6fy6bfesg.execute-api.ap-south-1.amazonaws.com/dev/login";
const API_KEY = 'YOUR-API-KEY';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // const myArray = localStorage.getItem('isLoggedIn');

    // if (myArray !== null){
    //   props.history.push('/');
    // }

    function submitHandler(event) {
        event.preventDefault();

        if ( email.trim().length === 0 || password.trim().length === 0) {
            setMessage("All fields are required");
          } else {

            const requestConfig = {
                headers: { "x-api-key": API_KEY }
            };
    
            const requestBody = {
                email: email,
                password: password
            };

            axios.post(LOGIN_URL, requestBody, requestConfig).then((response) => {
                const data = response.data.replace(/\'/g, '"');
                const responseJson = JSON.parse(data);
                // console.log(responseJson);
                // localStorage.setItem('isLoggedIn', `true ${responseJson.name}`);
                // props.history.push('/');
                setMessage('Successfully logged in, your name is ' + responseJson.name);
              }).catch((error) => {
                  console.log(error);
                  setMessage(error.response.data);
                })

        }
    }

    return (
        <div>
      <form method="POST" onSubmit={submitHandler} id="registerForm">
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

        <button type="submit" className="btn btn-success mt-2">Login</button>
        <br />
      </form>
      <h5 className="message">{message}</h5>
    </div>
    )
}

export default Login;
