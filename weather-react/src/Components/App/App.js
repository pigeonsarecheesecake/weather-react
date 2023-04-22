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

  // Coordinate
  const [coordinate, setCoordinate] = useState({});

  // Fetch the coordinate data from the api and set the state of the coordinate
  useEffect(()=> {
    if(city){
      const coordinateUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
      fetch(coordinateUrl)
      .then(response => response.json())
      .then(coordinateData => {
        setCoordinate({
          lat: coordinateData[0].lat,
          lon: coordinateData[0].lon
        })
      }).catch(e => alert(e))
    }
  },[city])

  // Fetch the current weather data and only run the effect when coordinate exists and use it as a dependency array
  useEffect(()=> {
    if (coordinate.lat && coordinate.lon){
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&units=imperial&appid=${apiKey}`;
      fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(currentWeatherData => {
        setCurrentWeather(
          {
            name: currentWeatherData.name,
            wind: currentWeatherData.wind.speed,
            feels_like : currentWeatherData.main.feels_like,
            temp: currentWeatherData.main.temp,
            humidity: currentWeatherData.main.humidity,
            weather: currentWeatherData.weather[0].main,
            weatherId: currentWeatherData.weather[0].id
          }
        )
      })
    }
    
  },[coordinate])
  // handleChange set user input based on the value inside the input box
  const handleChange = e =>{
    setUserInput(e.target.value);
    console.log(currentWeather)
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
        <WeatherIcon weatherId={currentWeather.weatherId} />
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
        <h2 className="forecast-title">5 Day Forecast</h2>
        <div className="forecast">
          <Forecast />
        </div>
      </div>
    </div>
  );
}

export default App;
