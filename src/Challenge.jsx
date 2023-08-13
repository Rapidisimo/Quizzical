import React from "react"
// import {decode} from 'html-entities';

export default function Challenge({question, correctAnswer, incorrectAnswers, choices, setSelectAnswers}) {

    function handleClick() {
        console.log('Hello')
    }

    const answerOption = choices.map( (data) => {
        return(
            <div className="singl-question" key={data}>
                <input type="radio" value={data} name={question} className="radio-element" onClick={handleClick} />
                <label htmlFor={data}>{data}</label>
            </div>
            )
    })

    return (
        <div className="question-group">
            <h3>{question}</h3>
            <fieldset className="answer-list">
                {answerOption}
            </fieldset>
        </div>
    )
}