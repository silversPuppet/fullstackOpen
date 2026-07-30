import countryService from "../services/countries"
import { useState, useEffect } from 'react'

const Country = ({ country, isDetailed, showDetail  }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    if (isDetailed) {
      countryService.getWeather(country.capital)
        .then(weatherData => setWeather(weatherData))
        .catch(error => console.error(error))
        console.log(country.capital)
    }
  }, [isDetailed, country.capital])

  if(!isDetailed){
    return (
        <li>
          {country.name.common} 
          <button onClick={showDetail}>Show</button>
        </li>
      )
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} /> 
          <p>Wind: {weather.wind.speed} km/h</p> 
        </div>
      </div>
    </div>
  )

}
export default Country