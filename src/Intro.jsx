import React from "react"

export default function Intro({handleIntro, apiSettings, setApiSettings}) {

  const [quizCategories, setquizCategories] = React.useState([])

  React.useEffect( () => {
    fetch('https://opentdb.com/api_category.php')
      .then( resp => resp.json() )
      .then( data => {
        setquizCategories(data.trivia_categories)
      })
  },[])

  const selectOptions = quizCategories.map( details => {
    return(
      <option value={details.id} key={details.id}>{details.name}</option>
    )
  })

  const lvlOptions = ['easy', 'medium', 'hard']
  const selectDifficulty = lvlOptions.map( (details, index) => {
    return(
      <option value={details} key={index}>{details}</option>
    )
  })

  function setupApi(e) {
    if(e.target.id === 'categories') {
      console.log('Option Selected')
      console.log(e.target.id)
      setApiSettings(prevData => {
        return {...prevData, category: e.target.value}
      })  
    }else if(e.target.id === 'difficulty') {
      console.log('Difficulty Selected')
      console.log(e.target.id)
      setApiSettings(prevData => {
        return {...prevData, difficulty: e.target.value}
      })  
    }else if(e.target.id === 'numQuestions') {
      console.log('Difficulty Selected')
      console.log(e.target.id)
      setApiSettings(prevData => {
        return {...prevData, amount: e.target.value}
      })
    }
  }

    return (
      <div className="intro">
        <h1>Quizzical</h1>
        <h2>A fun trivia App!</h2>
        <div className="quiz-options">
          <label htmlFor="categories">Category</label>
          <select name="categories" id="categories" onChange={setupApi}>
            <option value="">Please choose an option</option>
            {selectOptions}
          </select>
          <label htmlFor="difficulty">Difficulty</label>
          <select name="difficulty" id="difficulty" onChange={setupApi}>
            <option value="">Please choose an option</option>
            {selectDifficulty}
          </select>
          <label htmlFor="numQuestions">Number of Questions: {apiSettings.amount}</label>
          <input type="range" id="numQuestions" min={1} max={5} defaultValue={apiSettings.amount} step={1} onChange={setupApi} />
          <button onClick={handleIntro}>Start Quiz!</button>
        </div>
      </div>

    )
}