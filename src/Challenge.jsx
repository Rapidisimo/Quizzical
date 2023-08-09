import React from "react"
// import {decode} from 'html-entities';

export default function Challenge({question, correctAnswer, incorrectAnswers, choices}) {

    return (
        <div className="question-group">
        <h3>{question}</h3>
        <p><em>{correctAnswer}</em></p>
        <p>{incorrectAnswers}</p>
        <p className="choices">{choices}</p>
        </div>
    )
}