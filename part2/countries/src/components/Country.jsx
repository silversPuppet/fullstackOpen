const Country = ({ country, isDetailed, showDetail }) => {
  if(isDetailed){
    return(
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
        </div>

    </div>
    )
  }else{
  return (
      <li>
        {country.name.common} 
        <button onClick={showDetail}>Show</button>
      </li>
    )
  }
}
export default Country