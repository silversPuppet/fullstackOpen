import { useState } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow =  persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) 

  const addPerson = (event) => {
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already part of the phonebook.`)
    }else{
      event.preventDefault()
      console.log('button clicked', event.target)
      setPersons(persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }))
      console.log(persons)
    }
  }
  
  const handleNameChange = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
       />

      <h2>Numbers</h2>
  
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App