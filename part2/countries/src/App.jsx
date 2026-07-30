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
        setALL("Too many matches, specify another filter.", [], false)
      }else if(countriesToShow.length > 1){
        setALL(null, countriesToShow, false)
      }else if(countriesToShow.length === 1){
        setALL(null, countriesToShow, true)
      }else{
        setALL("No country with the specifications found", [], false)
      }

        
      })
    }

    
  }, [value])

  const setALL = (m, c, d) =>{
    setMessage(m)
    setCountries(c)
    setDetailed(d)
  }

  const showDetail = (c) => {
    event.preventDefault()
    console.log("button")
    setALL(null, [c], true)  
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
            showDetail={() => showDetail(country)}
          />)}
          </ul>
        </div>
      </div>
    )
  }
}

export default App