import './Forecast.css'
import React from 'react'
import WeatherIcon from '../WeatherIcon/WeatherIcon'

export default function Forecast({forecastObject}){
    // Days array
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Converts timestamp intoa new day object so I can get the day   
    const forecastTimeStamp = new Date(`${forecastObject.timeStamp}`)
    // Forecast day for the next 5 days
    const forecastDay = days[forecastTimeStamp.getDay()];
    // Round up the forecast temperature
    const forecastTemperature = Math.ceil(forecastObject.forecastTemperature)
    return(
        <li className='forecast-card'>
            <p>{forecastDay}</p>
            <WeatherIcon weatherId = {forecastObject.forecastWeatherId}/> 
            <p>{forecastTemperature} °F</p>
        </li>
        )
}