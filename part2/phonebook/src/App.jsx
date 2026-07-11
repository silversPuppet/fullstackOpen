import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import axios from 'axios'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow =  persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) 

  const personHook = () => {
    console.log("hook")
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      console.log("fulfilled")
      setPersons(response.data)
    })
  }
  useEffect(personHook, [])

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