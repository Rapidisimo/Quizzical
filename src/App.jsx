import React from "react"
import Intro from "./Intro"
import Quizz from "./Quizz"

function App() {

  const [intro, setIntro] = React.useState(true)
  const handleIntro = () =>{
    setIntro(!intro)
    console.log(intro)
  }
  console.log(intro)

  return (
    <div className="wrapper">
      {intro ? <Intro handleIntro={handleIntro}/> : ""}
      {!intro ? <Quizz /> : ""}
    </div>
  )
}

export default App
