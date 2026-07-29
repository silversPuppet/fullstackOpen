const Country = ({ country, toggleShow }) => {
    const label = toggleShow ?
        "showAll":
        "hide"

  return (
    <li className="country">
      {country.name.common} 
      <button>{label}</button>
    </li>
  )
}
export default Country