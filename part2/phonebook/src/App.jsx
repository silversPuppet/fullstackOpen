import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [updateMessage, setUpdateMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const personsToShow =  persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) 

  const personHook = () => {
    console.log("hook")
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)})
  }
  useEffect(personHook, [])

  const addPerson = (event) => {
    if(persons.some(person => person.name === newName)){
      if(window.confirm(`${newName} is already part of the phonebook. Do you wish to replace the old number with the new number?`)){
        event.preventDefault()

        const initialPerson = persons.find(person => person.name === newName)
        const changedPerson = {...initialPerson, number: newNumber }

        personService
        .update(changedPerson.id, changedPerson).then(initialP => {
          setPersons(persons.map(p => p.id !== initialP.id ? p : initialP ))
          setUpdateMessage(`Changed number of ${changedPerson.name}.`)
          setTimeout(() => {
            setUpdateMessage(null)
          }, 5000)
        })
        .catch(error =>{
          setErrorMessage(`Information of ${changedPerson.name} has already been removed from the server.`)
          setPersons(persons.filter(p => p.id !== changedPerson.id))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }else{
      event.preventDefault()

      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService.create(newPerson)
        .then(initialPersons => {
          const updatedPersons = persons.concat(initialPersons)
          setPersons(updatedPersons)
          console.log(updatedPersons)
          setUpdateMessage(`Added ${newPerson.name}.`)
          setTimeout(() => {
            setUpdateMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => (event) => {
    if(window.confirm("Are you sure you want to delete this person?")){
      event.preventDefault()
      personService.deleteP(id).then(initialPersons => {
        const updatedPersons = persons.filter(initialPersons => initialPersons.id != id)
        setPersons(updatedPersons)
        console.log(updatedPersons)
      })
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

      <Notification message={errorMessage} isUpdate={false} />  
      <Notification message={updateMessage} isUpdate={true} />      
      
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
  
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App