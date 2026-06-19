import { useState } from 'react'

const Button = ({label, onClick}) => {
  return(
    <button onClick={onClick}>{label}</button>
  )
}
const Statistics = (props) => {
  const values = [props.good, props.neutral, props.bad]
  const sum = (values) => {
    let sum = 0
    for(let i = 0; i < values.length; i++){
      sum += values[i];
    }
    return sum
  }

  const average = () => {
    return sum([props.good, 0, -props.bad]) / sum(values)
  }

  const percentFirstValue = () => {
      return (values[0] / sum(values)) * 100
  }
  if(sum(values) == 0)
  {
    return(
    <div>
      <h1>statistics</h1>
      <p>No feedback given.</p>
    </div>
  )
  }
  else{
    return(
      <div>
        <h1>statistics</h1>
        <p>good: {props.good}</p>
        <p>neutral: {props.neutral}</p>
        <p>bad: {props.bad}</p>
        <p>all: {sum(values)}</p>
        <p>average: {average()} </p>
        <p>positive: {percentFirstValue()} %</p>
      </div>
    )
  }
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