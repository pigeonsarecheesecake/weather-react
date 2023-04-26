import './App.css'
import React, {useState, useEffect} from 'react'
import SearchBar from '../SearchBar/SearchBar.js'
import MainContent from '../MainContent/MainContent'
import SearchResultsList from '../SearchResultsList/SearchResultsList'

function App() {
  // Current Date 
  const currentDate = new Date().toDateString();

  // API key
  const apiKey = process.env.REACT_APP_API_KEY;
  
  // Initial states
  const [city, setCity] = useState('');
  const [userInput, setUserInput] = useState('');
  const [coordinate, setCoordinate] = useState();
  const [currentWeather, setCurrentWeather] = useState({})
  const [cityState, setCityState] = useState({});
  const [forecastData, setForecastData] = useState();
  const [searchResults, setSearchResults] =useState([]);

  // Fetch the coordinate data from the api and set the state of the coordinate
  useEffect(()=> {
    if(city){
      const coordinateUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
      fetch(coordinateUrl)
      .then(response => response.json())
      .then(coordinateData => {
        setSearchResults(coordinateData);
      } ).catch(e => alert("City not found"))
    }
  },[city,apiKey])

  // Fetch the current weather data and only run the effect when coordinate exists and use it as a dependency array
  useEffect(()=> {
    if (coordinate){
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&units=imperial&appid=${apiKey}`;
      const foreCastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&units=imperial&appid=${apiKey}`;

      // Current weather
      fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(currentWeatherData => {
        setCurrentWeather(
          {
            name: currentWeatherData.name,
            country: currentWeatherData.sys.country,
            wind: currentWeatherData.wind.speed,
            feels_like : currentWeatherData.main.feels_like,
            temp: currentWeatherData.main.temp,
            humidity: currentWeatherData.main.humidity,
            weather: currentWeatherData.weather[0].main,
            weatherId: currentWeatherData.weather[0].id
          }
        );
      });

      // 5 day Forecast
      fetch(foreCastUrl)
      .then(response => response.json())
      .then(currentForecastData => {
        // Forecast array
        let forecastArray = [];
        
        // Forecast data list has 40 items. I just want to retrieve data the same time everyday for 5 days.
        for ( let i = 7; i < currentForecastData.list.length ; i+=8 ){
          const timeStamp = currentForecastData.list[i].dt_txt;
          const forecastTemperature = currentForecastData.list[i].main.temp;
          const forecastWeatherId = currentForecastData.list[i].weather[0].id;
          forecastArray.push({timeStamp: timeStamp, forecastTemperature: forecastTemperature, forecastWeatherId: forecastWeatherId});
        }

        // Set forecast state
        setForecastData(forecastArray)        
      }).catch(e => alert(e));
    }
  },[coordinate,apiKey]);

    
  // Event handlers
  const handleClick = clickedCity => {
    setCoordinate(
      {
        lat: clickedCity.lat,
        lon: clickedCity.lon
      }
    )
    setCityState(
      {
        name: clickedCity.name,
        state: clickedCity.state
      }
    )
    setSearchResults([]);
  }

  // handleChange set user input based on the value inside the input box
  const handleChange = e =>{
    setUserInput(e.target.value);
  }
  
  // handleClick to only change city state when user clicks
  const handleSearch= () =>{
  // Using regex to replace space with %20 so space will be translated in the url
  const userInputNoSpace = userInput.replace(/ /g,"%20");
  setCity(userInputNoSpace);
  setCoordinate();
  }

  // Renders
  return (
    <div className="App">
      {/* Search Bar */}
      <SearchBar onChange={handleChange} onSearch={handleSearch}/>
      {/* Search Results */}
      <SearchResultsList searchResults={searchResults} onClick={handleClick}/>
      {/* Main Content */}
      <MainContent cityState={cityState} coordinate={coordinate} currentWeather={currentWeather} currentDate={currentDate} forecastData={forecastData} />
    </div>
  );
}

export default App;
