import {   Routes, Route } from 'react-router-dom';
import Register from './component/register';
import AdminDashboard from './component/adminDashboard';
import Login from './component/login';
import Home from './component/home';
import Credit from './component/credit';

function App() {
  return (
    
      
      <Routes>
       <Route path="register" element={<Register />} />
       <Route path="" element={<Login />} />
       <Route path="login" element={<Login />} />
       <Route path="admindashboard" element={<AdminDashboard />} />
       <Route path="home" element={<>   
        <Home /></>} />
        
        </Routes>
     
    
  );
}

export default App;
