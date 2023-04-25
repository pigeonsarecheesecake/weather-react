import './App.css';
import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import MainContent from '../MainContent/MainContent';

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

  // Forecast state
  const [forecast, setForecast] = useState();

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
      const foreCastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&units=imperial&appid=${apiKey}`;
      // Current weather
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

      // forecast
      fetch(foreCastUrl)
      .then(response => response.json())
      .then(currentForecastData => {
          // Forecast array
        let forecastArray = [];
        for ( let i = 7; i < currentForecastData.list.length ; i+=8){
          const timeStamp = currentForecastData.list[i].dt_txt;
          const forecastTemperature = currentForecastData.list[i].main.temp
          forecastArray.push({timeStamp: timeStamp, forecastTemperature: forecastTemperature});
        }
        setForecast(forecastArray)
      }).catch(e => alert(e))
    }
    
  },[coordinate])

  // Fetch the forecast data and only run the effect when the coordinate


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
  
  // Only displays main content when city is not falsy
  const isDisplayed = ()=> {
    if (city){
      return true;
    } else{
      return false;
    }
  }

  // Renders
  return (
    <div className="App">
      {/* Search Bar */}
      <SearchBar onChange={handleChange} onClick={handleClick}/>
      {/* Main Content */}
      <MainContent isDisplayed={isDisplayed()} currentWeather={currentWeather} currentDate={currentDate} forecast={forecast} />
    </div>
  );
}

export default App;
