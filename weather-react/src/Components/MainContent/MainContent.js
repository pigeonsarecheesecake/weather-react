import React from "react";
import Forecast from '../Forecast/Forecast';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import './MainContent.css'

export default function MainContent({currentWeather, currentDate, isDisplayed}){
    if (isDisplayed){
        return(
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
        )
    }
    
}