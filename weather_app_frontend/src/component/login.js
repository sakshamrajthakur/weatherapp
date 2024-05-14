import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const routetoregister=()=>{
    navigate('/register')
  }
  const showAlert = () => {
    alert('INVALID Credential');
  };


const API_URL = 'http://your-backend-api-url/';

 const getToken = () => {
  return localStorage.getItem('token');
};

 const setToken = (token) => {
  localStorage.setItem('token', token);
};
  useEffect(() => {
     const isAuthenticated = async () => {

      const token = getToken();
    
      if (!token) {
        return false;
      }
    
      try {
        const response = await fetch('http://127.0.0.1:8000/tokenauth/check-authentication', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          // If backend responds with unauthorized, try to refresh token
          if (response.status === 401) {
         
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const refreshResponse = await fetch('http://127.0.0.1:8000/tokenauth/refresh-token', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh_token: refreshToken })
              });
    
              if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                const newAccessToken = data.access_token;
        
                navigate('/home')
                setToken(newAccessToken);
                return true;
              }
            }
          }
          
          return false;
        }
        if (response.status==200){
          navigate('/home')
        }
    
        return true;
      } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
      }
    };
    isAuthenticated()
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/tokenauth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
   
      localStorage.setItem('token', data.access);
      localStorage.setItem('refresh_token',data.refresh)

      
      if (data.permission['admin'])
        {localStorage.setItem('permission','admin')}
      else if (data.permission['userone'])
        {localStorage.setItem('permission','userone')}
      else if (data.permission['usertwo'])
        {localStorage.setItem('permission','usertwo')}
      else 
        {localStorage.setItem('permission','')}
      
      
      if (data.message === 'sucess')  
      {navigate('/home');}
    } catch (error) {
       showAlert()
      console.error('Login Error:', error);
      
    }
  };
  

  return (
<>    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
     
    </div>
    <Link to="/register">
        <button>register</button>
      </Link>
      </>
)};

export default Login;
