import { useState } from 'react'

const Button = ({label, onClick}) => {
  return(
    <button onClick={onClick}>{label}</button>
  )
}
const Statistics = ({good, neutral, bad}) => {
  return(
    <div>
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOne = (updateFunction, value) => () => {
          updateFunction(value + 1)
          console.log("Previous value:", value)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button label={"good"} onClick={increaseByOne(setGood, good)} />
      <Button label={"neutral"} onClick={increaseByOne(setNeutral, neutral)} />
      <Button label={"bad"} onClick={increaseByOne(setBad, bad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App