
export default function Challenge({triviaData, setTriviaData, question, choices, answerChoice}) {
 

    const answerOptions = choices.map( (data, index) => {
        return(
            <div className="single-question" key={index}>
                <input type="radio" value={data} className="radio-element" name={question} onClick={answerChoice} />
                <label htmlFor={data}>{data}</label>
            </div>
        )
    })

    return (
        <div className="question-group">
            <h3>{question}</h3>
            <fieldset className="answer-list">
                {answerOptions}
            </fieldset>
        </div>
    )
}