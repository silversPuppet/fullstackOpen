import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

const getWeather = (capitalName) => {
    console.log(capitalName)
    return axios
    .get(`https://api.openweathermap.org/geo/1.0/direct?q=${capitalName}&limit=1&appid=${api_key}`)
    .then(geoResponse => {
        const lat = geoResponse.data[0].lat
        const lon = geoResponse.data[0].lon 
        console.log(lat, lon)

        return(
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
        )
    })
    .then(weatherResponse => {
        console.log(weatherResponse.data)
        return weatherResponse.data
    })
    .catch(error => {
      console.error('Weather fetch failed:', error.response?.status, error.response?.data);
      throw error;
    });
}

export default{getAll, getCountry, getWeather }