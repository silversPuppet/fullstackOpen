import { useState } from 'react'

const Button = ({label, onClick}) => {
  return(
    <button onClick={onClick}>{label}</button>
  )
}

const Statisticline = ({text, value}) => {
  return(
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({good, neutral, bad}) => {
  const values = [good, neutral, bad]
  const sum = (values) => {
    let sum = 0
    for(let i = 0; i < values.length; i++){
      sum += values[i];
    }
    return sum
  }

  const average = () => {
    return sum([good, 0, -bad]) / sum(values)
  }

  const percentFirstValue = () => {
      return (values[0] / sum(values)) * 100 + "%";
  }
  if(sum(values) == 0)
  {
    return(
    <div>
      <p>No feedback given.</p>
    </div>
  )
  }
  else{
    return(
      <div>
        <table>
          <thead>
              <Statisticline text={"good"} value={good} />
              <Statisticline text={"neutral"} value={neutral} />
              <Statisticline text={"bad"} value={bad} />
              <Statisticline text={"all"} value={sum(values)} />
              <Statisticline text={"average"} value={average()} />
              <Statisticline text={"positive"} value={percentFirstValue()} />
          </thead>
        </table>
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
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App