// Login.js
import React,{useState} from 'react';
import '../style/Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate=useNavigate();
  const handleApi = (event) => {
    event.preventDefault();
      // If college is selected from input field
      axios.post('http://localhost:80/auth/login', { email,password})
        .then(res => {
          if(res.data.success)
          {
            localStorage.setItem('token',res.data.authToken);
            navigate('/shop');
          }
          else{
            console.log("Invalid credentials")
          }
        })
        .catch(err => {
          console.log(err);
        });
  };
  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn" onClick={handleApi}>Login</button>
      </form>
      <div className="link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
