import Person from './Person.jsx'

const Persons = ({ persons }) => {
  return (
    <ul>
    {persons.map(person => <Person 
        key={person.id} 
        name={person.name} 
        number={person.number} />)}
    </ul>
  )
}

export default Persons