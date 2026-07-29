import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Country from './components/Country'


const App = () => {
  const [value, setValue] = useState(null)
  const [countries, setCountries] = useState([])
  const [message, setMessage] = useState(null)
  const [detailed, setDetailed] = useState(false)

  useEffect(() => {
    console.log('effect run, country is now', value)

    if (value) {
      countryService.getAll().then(initialCountries => {
        const countriesToShow = initialCountries.filter(c => c.name.common.toLowerCase().includes(value.toLocaleLowerCase()))
        console.log(countriesToShow)
        
      if(countriesToShow.length > 10){
        setMessage("Too many matches, specify another filter.")
        setCountries([])
        setDetailed(false)
      }else if(countriesToShow.length > 1){
        console.log("Display list of countries.")
        setMessage(null)
        setCountries(countriesToShow)
        setDetailed(false)
      }else if(countriesToShow.length === 1){
        console.log("Display detailed info about one country.")
        setMessage(null)
        setCountries(countriesToShow)
        setDetailed(true)
      }else{
        setMessage("No country with the specifications found")
        setCountries([])
        setDetailed(false)
      }

        
      })
    }

    
  }, [value])

  const showDetail = (event) => {
    event.preventDefault()
    //To implement later
  }

  const handleChange = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }
  if(detailed){
    return(
      <div>
        <h1>Countries</h1>
          find countries: <input country={value} onChange={handleChange} />
        <div>
          <p>{message}</p>
          <Country 
          country={countries[0]}
          isDetailed={true}
          showDetail={showDetail}
          />
        </div>
      </div>
    )
  }else{
    return (
      <div>
        <h1>Countries</h1>
          find countries: <input country={value} onChange={handleChange} />
        <div>
          <p>{message}</p>
          
          <ul>
          {countries.map(country => <Country 
            key={country.cca2}
            country={country} 
            isDetailed={false}
            toggleShow={showDetail}
          />)}
          </ul>
        </div>
      </div>
    )
  }
}

export default App