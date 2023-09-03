import React from "react"
import Intro from "./Intro"
import Quizz from "./Quizz"

function App() {
  // true: Show Intro page | false: Show Quiz page
  const [intro, setIntro] = React.useState(true)

  // Default Quiz API fetch settings in case none are chosen
  const [apiSettings, setApiSettings] = React.useState(
    {
    amount: 5,
    category: 18,
    type: 'multiple',
    difficulty: 'easy'
   }
  )

  // function to update State when starting Quiz to show Quiz page
  const handleIntro = () =>{
    setIntro(!intro)
  }

  return (
    <div className="wrapper">
      {intro ? <Intro handleIntro={handleIntro} apiSettings={apiSettings} setApiSettings={setApiSettings}/> : ""}
      {!intro ? <Quizz setIntro={setIntro} apiSettings={apiSettings}/> : ""}
    </div>
  )
}

export default App