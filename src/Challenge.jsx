
export default function Challenge({questionData, recordAnswer}) {

    const {question, allAnswers} = questionData

    const answerOptions = allAnswers.map( (data, index) => {

        return(
            <div key={index}>
                <input 
                    type="radio" 
                    value={data} 
                    className="radio-element" 
                    name={question} 
                    onClick={recordAnswer} />
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