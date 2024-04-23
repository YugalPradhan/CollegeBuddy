import React, { useState, useEffect } from 'react';
import '../style/Signup.css';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [collegename, setCollegename] = useState('');
  const [colleges, setColleges] = useState([]);
  const url = 'http://localhost:80/auth/signup';
  const navigate=useNavigate();
  useEffect(() => {
    axios.get('http://localhost:80/college/getcolleges')
      .then(res => {
        setColleges(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
//
const handleApi = async (event) => {
  event.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/college/addcollege', { name:college==="Other"?collegename:college});
      const newCollegeId = response.data._id;
      createUser(newCollegeId); // Pass the newly created college ID to createUser
    } catch (error) {
      console.log(error);
    }
};

  const createUser = (collegeId) => {
    const data = { name:username, email, password, college: collegeId};
    axios.post(url, data)
      .then(res => {
        console.log(res);
        navigate('/shop');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="college">College:</label>
          <select id="college" name="college" className="input-field" value={college} onChange={(e)=>setCollege(e.target.value)}>
            <option value="">Select College</option>
            {colleges.map((college, index) => (
              <option key={index} value={college}>{college}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          { college==="Other" &&
            <div className="input-group">
          <label htmlFor="collegename">College Name:</label>
          <input type="text" id="collegename" name="collegename" className="input-field" value={collegename} onChange={(e)=>setCollegename(e.target.value)} />
        </div>
          }
        </div>
        <button type="submit" className="btn" onClick={handleApi}>Sign Up</button>
      </form>
      <div className="link">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default Signup;
