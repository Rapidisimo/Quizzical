import React from "react"

export default function Intro({handleIntro}) {
    return (
        <div className="intro">
        <h1>Quizzical</h1>
        <h2>A fun trivia App!</h2>
        <button onClick={handleIntro}>START!</button>
      </div>

    )
}