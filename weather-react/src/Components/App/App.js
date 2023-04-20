import './App.css';
import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import Forecast from '../Forecast/Forecast';

function App() {
  // Initial states

  // API key
  const apiKey = process.env.REACT_APP_API_KEY;

  // City state
  const [city, setCity] = useState('');

  // User Input state
  const [userInput, setUserInput] = useState('');

  // Current Weather
  const [currentWeather, setCurrentWeather] = useState({})

  // Fetch the coordinate of city when city is not falsy
  useEffect(()=>{
    if(city){
      // Url for geocoding
      const coordinateUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
      
      // Fetches longitude and latitude data from the geocoding API
      fetch(coordinateUrl)
      .then(response => response.json())
      // Using the coordinate fetched from the geocoding API, the coordinate will then be used to fetch data from the current weather API
      .then(coordinateData => {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinateData[0].lat}&lon=${coordinateData[0].lon}&units=imperial&appid=${apiKey}`;
        // Returns another promise, if we don't return the next then block will not receive the response of the previous fetch call
        return fetch(currentWeatherUrl)
      })
      .then(response => response.json())
      // Once current weather data is fetched, it will populate current weather state with properties I'd like to display 
      .then(currentWeatherData => {
        setCurrentWeather(
          { name: currentWeatherData.name,
            wind: currentWeatherData.wind.speed,
            feels_like : currentWeatherData.main.feels_like,
            temp: currentWeatherData.main.temp,
            humidity: currentWeatherData.main.humidity,
            weather: currentWeatherData.weather[0].main}
        )}).catch(e => alert(e))
    }
  },[city]);

  // handleChange set user input based on the value inside the input box
  const handleChange = e =>{
    setUserInput(e.target.value);
  }
  
  // handleClick to only change city state when user clicks
  const handleClick = () =>{
    // Using regex to replace space with %20 so space will be translated in the url
    const userInputNoSpace = userInput.replace(/ /g,"%20");
    setCity(userInputNoSpace);
  }

  return (
    <div className="App">
      {/* Search Bar */}
      <SearchBar onChange={handleChange} onClick={handleClick}/>
      {/* Main Content */}
      <div className="main-content">
        {/* City information (name, date, weather icon*/}
        <h1>{currentWeather.name}</h1>
        <h2>date</h2>
        <div className="weather-icon">
          <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M93.1818 34.0909V0H106.818V34.0909H93.1818ZM151.364 58.1818L141.818 48.6364L165.909 24.3182L175.455 34.0909L151.364 58.1818ZM165.909 106.818V93.1818H200V106.818H165.909ZM93.1818 200V165.909H106.818V200H93.1818ZM48.4091 57.9545L24.5455 34.0909L34.0909 24.5455L58.1818 48.6364L48.4091 57.9545ZM166.136 175.455L141.818 151.364L151.136 142.045L175.682 165.682L166.136 175.455ZM0 106.818V93.1818H34.0909V106.818H0ZM34.3182 175.455L24.5455 165.909L48.4091 142.045L53.4091 146.591L58.4091 151.364L34.3182 175.455ZM100 154.545C84.8485 154.545 71.9697 149.242 61.3636 138.636C50.7576 128.03 45.4545 115.152 45.4545 100C45.4545 84.8485 50.7576 71.9697 61.3636 61.3636C71.9697 50.7576 84.8485 45.4545 100 45.4545C115.152 45.4545 128.03 50.7576 138.636 61.3636C149.242 71.9697 154.545 84.8485 154.545 100C154.545 115.152 149.242 128.03 138.636 138.636C128.03 149.242 115.152 154.545 100 154.545ZM100 140.909C111.364 140.909 121.023 136.932 128.977 128.977C136.932 121.023 140.909 111.364 140.909 100C140.909 88.6364 136.932 78.9773 128.977 71.0227C121.023 63.0682 111.364 59.0909 100 59.0909C88.6364 59.0909 78.9773 63.0682 71.0227 71.0227C63.0682 78.9773 59.0909 88.6364 59.0909 100C59.0909 111.364 63.0682 121.023 71.0227 128.977C78.9773 136.932 88.6364 140.909 100 140.909Z" fill="rgb(255, 229, 0,.8)"/>
          </svg>
        </div>
        {/* Descriptions */}
        <div className="description">
          <p>Wind</p>
          <p>{currentWeather.wind} mph</p>
          <p>{currentWeather.weather}</p>
          <p>{currentWeather.temp}°</p>
        </div>
        <div className="description">
          <p>Feels like</p>
          <p>{currentWeather.feels_like}°</p>
          <p>Humidity</p>
          <p>{currentWeather.humidity}%</p>
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
