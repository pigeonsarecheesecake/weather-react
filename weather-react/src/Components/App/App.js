import './App.css';
import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import Forecast from '../Forecast/Forecast';

function App() {
  // Initial states
  // City
  const apiKey = process.env.REACT_APP_API_KEY;
  const [city, setCity] = useState('');
  const [userInput, setUserInput] = useState('');
  const [coordinate, setCoordinate] = useState({});

  // Date

  // Fetch the coordinate of city whencity is not falsy
  useEffect(()=>{
    if(city){
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
      .then(response => response.json()).then(data => setCoordinate({longitude: data[0].lon, latitude: data[0].lat}));
    }
  },[city]);

  // Fetch the current weather data using coordinate
  useEffect( ()=>{
  }
  );

  // handleChange set user input based on the value inside the input box
  const handleChange = e =>{
    setUserInput(e.target.value);
    console.log(coordinate)
  }
  
  // handleClick to only change city state when user clicks
  const handleClick = () =>{
    setCity(userInput);
  }

  return (
    <div className="App">
      {/* Search Bar */}
      <SearchBar onChange={handleChange} onClick={handleClick}/>
      {/* Main Content */}
      <div className="main-content">
        {/* City information (name, date, weather icon*/}
        <h1>{city}</h1>
        <h2>date</h2>
        <div className="weather-icon">
          <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M93.1818 34.0909V0H106.818V34.0909H93.1818ZM151.364 58.1818L141.818 48.6364L165.909 24.3182L175.455 34.0909L151.364 58.1818ZM165.909 106.818V93.1818H200V106.818H165.909ZM93.1818 200V165.909H106.818V200H93.1818ZM48.4091 57.9545L24.5455 34.0909L34.0909 24.5455L58.1818 48.6364L48.4091 57.9545ZM166.136 175.455L141.818 151.364L151.136 142.045L175.682 165.682L166.136 175.455ZM0 106.818V93.1818H34.0909V106.818H0ZM34.3182 175.455L24.5455 165.909L48.4091 142.045L53.4091 146.591L58.4091 151.364L34.3182 175.455ZM100 154.545C84.8485 154.545 71.9697 149.242 61.3636 138.636C50.7576 128.03 45.4545 115.152 45.4545 100C45.4545 84.8485 50.7576 71.9697 61.3636 61.3636C71.9697 50.7576 84.8485 45.4545 100 45.4545C115.152 45.4545 128.03 50.7576 138.636 61.3636C149.242 71.9697 154.545 84.8485 154.545 100C154.545 115.152 149.242 128.03 138.636 138.636C128.03 149.242 115.152 154.545 100 154.545ZM100 140.909C111.364 140.909 121.023 136.932 128.977 128.977C136.932 121.023 140.909 111.364 140.909 100C140.909 88.6364 136.932 78.9773 128.977 71.0227C121.023 63.0682 111.364 59.0909 100 59.0909C88.6364 59.0909 78.9773 63.0682 71.0227 71.0227C63.0682 78.9773 59.0909 88.6364 59.0909 100C59.0909 111.364 63.0682 121.023 71.0227 128.977C78.9773 136.932 88.6364 140.909 100 140.909Z" fill="rgb(255, 229, 0,.8)"/>
          </svg>
        </div>
        {/* Descriptions */}
        <div className="description">
          <p>Wind</p>
          <p>8 mph</p>
          <p>Sunny</p>
          <p>52</p>
        </div>
        <div className="description">
          <p>Feels like</p>
          <p>52°</p>
          <p>Humidity</p>
          <p>5%</p>
        </div>
        {/* Divider */}
        <div className="divider"></div>
        <h2 className="forecast-title">6 Day Forecast</h2>
        <div className="forecast">
          <Forecast />
        </div>
      </div>
    </div>
  );
}

export default App;
