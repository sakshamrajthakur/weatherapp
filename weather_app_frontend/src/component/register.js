// Register.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate,useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const showAlert = (message) => {
    alert(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/tokenauth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
     
      const data = await response.json();
     
     
      localStorage.setItem('token', data.access);
      if (data.message === 'sucess')  
        {navigate('/home');}
      else if (data['errors']['username']){
        showAlert(data['errors']['username'][0])
      }
      
    } catch (errors) {
      console.error('Registration Error:', errors);
      // Handle registration error, show error message to the user, etc.
    }
  };

  return (
    <><div>
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  </div>
      <Link to="/login">
      <button>login</button>
    </Link></>
  );
};

export default Register;
