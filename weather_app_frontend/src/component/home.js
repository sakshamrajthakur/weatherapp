import React, { useState, useEffect } from "react";
import axios from "axios";

import Forecast from "./forecast";
import AdminDashboard from "./adminDashboard"
import { useNavigate } from 'react-router-dom';

import "../style.css"
import '@fortawesome/fontawesome-free/css/all.min.css';


function Home() {
  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });
const permission = localStorage.getItem('permission')
const [inputValue, setInputValue] = useState('');
const [called,setCalled]=useState(false)
const showAlert = (message) => {
  alert(message);
};

const navigate = useNavigate()

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Nocvember",
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

    const data={
      'city':'delhi'
    }
    const handleClick = async () => {

      
            try {
             


              const response = await fetch('http://127.0.0.1:8000/weather/get-specific-city-weather/',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // Include token in Authorization header
                }, body: JSON.stringify({ inputValue }),
              } );
              const data = await response.json();
      
              setWeather({ data: response.data, loading: false, error: false });
            } catch (error) {
              setWeather({ data: {}, loading: false, error: true });
              console.log("error", error);
            }
          };
  
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (inputValue !== newValue) {
      setInputValue(newValue);
    }
  };


  const token = localStorage.getItem('token');




  useEffect(() => {
    const fetchData = async () => {


      try {
     
        const response = await axios.get('http://127.0.0.1:8000/weather/get-weather',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in Authorization header
          },
        }
        );
        
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        
        setWeather({ data: {}, loading: false, error: true });
        showAlert(error['message']+'. Token Expired')
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  const logout =()=>{
    localStorage.clear()
    navigate('/login')
  }

  return (<>
  {permission=='userone' || permission=='admin' ?( <div className="SearchEngine">
    
      <input
      
        className="city-search"
        placeholder="enter city name"
       
     
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        
        
      />
      <button onClick={handleClick}><i className="fas fa-search" style={{ fontSize: "18px" }}></i></button>
    </div>):('')}
  
        <button onClick={logout}  style={{ fontSize: "18px" }} >Logout</button>
    
   
    <div className="App">

      {/* SearchEngine component */}
    

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching..</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry city not found, please try again.
            </span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.condition && (
        // Forecast component
        <>
        <Forecast weather={weather} toDate={toDate} />
      
        </>
        
      )}
    </div>
{    permission === 'admin'?
    (<AdminDashboard/>):('')}
    </>   
  );
}

export default Home;