import './App.css';
import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import Forecast from '../Forecast/Forecast';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

function App() {
  // Current Date 
  const currentDate = new Date().toDateString();
  
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
        )})
        .catch(e => alert(e))
    }
  },[city]);

  // handleChange set user input based on the value inside the input box
  const handleChange = e =>{
    setUserInput(e.target.value);
    console.log(currentDate)
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
        <h2>{currentDate}</h2>
        {/* Weather Icon */}
        <WeatherIcon />
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
