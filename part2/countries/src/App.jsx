import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Country from './components/country'

const App = () => {
  const [value, setValue] = useState(null)
  const [countries, setCountries] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect run, country is now', value)

    if (value) {
      countryService.getAll().then(initialCountries => {
        const countriesToShow = initialCountries.filter(c => c.name.common.toLowerCase().includes(value.toLocaleLowerCase()))
        console.log(countriesToShow)
        
      if(countriesToShow.length > 10){
        setMessage("Too many matches, specify another filter.")
        setCountries([])
      }else if(countriesToShow.length > 1){
        console.log("Display list of countries.")
        setMessage(null)
        setCountries(countriesToShow)
      }else if(countriesToShow.length == 1){
        console.log("Display detailed info about one country.")
        setMessage(null)
        setCountries(countriesToShow)
      }else{
        setMessage("No country with the specifications found")
        setCountries([])
      }

        
      })
    }

    
  }, [value])

  const handleChange = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  return (
    <div>
      <h1>Countries</h1>
        find countries: <input country={value} onChange={handleChange} />
      <div>
        <p>{message}</p>
        <ul>
        {countries.map(country => <Country 
          key={country.cioc}
          country={country} 
        />)}
            
        </ul>
      </div>
    </div>
  )
}

export default App