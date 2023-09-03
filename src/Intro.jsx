import React from "react"

export default function Intro({handleIntro, apiSettings, setApiSettings}) {

  // State to track Categories
  const [quizCategories, setquizCategories] = React.useState([])

  // API call to retrieve Categories
  React.useEffect( () => {
    fetch('https://opentdb.com/api_category.php')
      .then( resp => resp.json() )
      .then( data => {
        setquizCategories(data.trivia_categories)
      })
  },[])

  // Generate Options for Categories dropdown
  const selectOptions = quizCategories.map( details => {
    return(
      <option value={details.id} key={details.id}>{details.name}</option>
    )
  })

  // Manually provided Difficulty level choices
  const lvlOptions = ['easy', 'medium', 'hard']
  // Generate Optsions for Difficulty dropdown
  const selectDifficulty = lvlOptions.map( (details, index) => {
    if(details === 'easy') {
      return(
        <option value={details} key={index} selected>{details}</option>
      )  
    }else {
      return(
        <option value={details} key={index}>{details}</option>
      )  
    }
  })

  // function to setup State properties to use once API is called based on user choices
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
            {selectDifficulty}
          </select>
          <label htmlFor="numQuestions">Number of Questions: {apiSettings.amount}</label>
          <input type="range" id="numQuestions" min={1} max={5} defaultValue={apiSettings.amount} step={1} onChange={setupApi} />
          <button onClick={handleIntro}>Start Quiz!</button>
        </div>
      </div>

    )
}