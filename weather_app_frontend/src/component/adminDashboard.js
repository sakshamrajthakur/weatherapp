// AdminDashboard.js

import React, { useState, useEffect } from 'react';
import './adminDashboard'; // Import CSS file for styling


const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const token = localStorage.getItem('token');
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/tokenauth/user-data',

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in Authorization header
        },
      } 
      ); // Update the API endpoint
      const data = await response.json();

      setUserData(data);
      setResponse(response.status)
      console.log(response.status)
    } catch (error) {
      console.error('Fetch Data Error:', error);
      // Handle error
    }
  };

  const handlePermissionChange=async (user,permission)=>{
    try {
      const response = await fetch('http://127.0.0.1:8000/tokenauth/change-permission',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in Authorization header
        }, body: JSON.stringify({ user, permission }),
      } );
      const data = await response.json();
      fetchData()
    } catch (error) {
      console.error('Login Error:', error);
      // Handle login error, show error message to the user, etc.
    }
  }

  return (
<>
{response==200?(
      <div className="user-data-table-container">
      <h2>User Data Table</h2>
      <table className="user-data-table">
        <thead>
          <tr>
           
            <th>Username</th>
            <th>User Permission</th>
           
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user['user']['username']}</td>
              <td>
            <select value={user.admin?('admin'):(user.userone?('userone'):(user.usertwo?('usertwo'):('no_per')))} onChange={(e) => handlePermissionChange(user['user']['username'], e.target.value)}>
            <option value="no_per">No Permission</option>
              <option value="admin">Admin</option>
              <option value="userone">User One</option>
              <option value="usertwo">User Two</option>
            </select>
          </td>
        
            </tr>
          ))}
        </tbody>
      </table>
    </div>
):('Token Expired')}
</>
  );
};

export default AdminDashboard;
