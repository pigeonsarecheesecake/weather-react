import React from "react"
import WeatherIcon from '../WeatherIcon/WeatherIcon'
import './MainContent.css'
import ForecastList from "../ForecastList/ForecastList"

export default function MainContent({coordinate, currentWeather, currentDate, forecastData, cityState}){
    //Only renders when coordinate exists 
    if (coordinate){
      return(
          <div className="main-content">
            {/* City information (name, date, weather icon*/}
            <div className="header-one">
              <h1>{cityState.name} <br></br>{cityState.state}</h1>
            </div>
            <h2>{currentDate}</h2>
            {/* Weather Icon */}
            <WeatherIcon weatherId={currentWeather.weatherId} />
            {/* Descriptions */}
            <div className="description left">
              <p>Wind</p>
              <p>{currentWeather.wind} mph</p>
              <p>{currentWeather.weather}</p>
              <p>{Math.ceil(currentWeather.temp)}°F</p>
            </div>
            <div className="description right">
              <p>Feels like</p>
              <p>{currentWeather.feels_like}°</p>
              <p>Humidity</p>
              <p>{currentWeather.humidity}%</p>
            </div>
            {/* Divider */}
            <div className="divider"></div>
            <h2 className="forecast-title">5 Day Forecast</h2>
            {/* Forecast List */}
            <div className="forecast-list-container">
              <ForecastList forecastData={forecastData}/>
            </div>
          </div>
          )} 
}