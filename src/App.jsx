import React from "react"
import Intro from "./Intro"
import Quizz from "./Quizz"

function App() {

  const [intro, setIntro] = React.useState(true)
  const handleIntro = () =>{
    setIntro(!intro)
  }

  // Default Quiz settings in case none are chosen
  const [apiSettings, setApiSettings] = React.useState({
    amount: 5,
    category: 18,
    type: 'multiple',
    difficulty: 'easy'
  })

  return (
    <div className="wrapper">
      {intro ? <Intro handleIntro={handleIntro} apiSettings={apiSettings} setApiSettings={setApiSettings}/> : ""}
      {!intro ? <Quizz apiSettings={apiSettings}/> : ""}
    </div>
  )
}

export default App
