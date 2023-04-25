import React from "react"
import Forecast from "../Forecast/Forecast"

export default function ForecastList({forecastData}){
    if (forecastData){
        // Maps through the forecast data, I'm aware that using index as key should be avoidable.
        // I'm using index as key this time around, because these forecast components will not be modified
        const forecastList = forecastData.map((forecastObject, i) => {
            return <Forecast key={i} forecastObject={forecastObject}/>
        })

        return(
            <ul className="forecast-list">
                {forecastList}
            </ul>
        )
    }
}