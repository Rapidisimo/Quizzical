
export default function Challenge({triviaData, setTriviaData, question, choices, recordAnswer}) {
 

    const answerOptions = choices.map( (data, index) => {

        const answerColor = '';

        return(
            <div key={index}>
                <input type="radio" value={data} className="radio-element" name={question} onClick={recordAnswer} />
                <label htmlFor={data} className="answer-bkg">{data}</label>
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