import React from "react"
// import {decode} from 'html-entities';

export default function Challenge({question}) {

    return (
        <div className="question-group">
        <h3>{question}</h3>
        <p>Placeholder Answers: Option 1 | Option 2 | Option 3</p>
        </div>
    )
}