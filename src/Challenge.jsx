
export default function Challenge({questionData, recordAnswer}) {

    const {question, allAnswers, choseCorrectly, userAnswer, correct_answer, finished} = questionData

    // Generate answer radio buttons for each question
    const answerOptions = allAnswers.map( (data, index) => {
        // Is the Quiz finished? Then apply a CSS class name based if the answer is correct, incorrect or not chosen.
        // Should be refactored to if else for better readability
        const answerColor = finished ? (data === correct_answer ? "correct-answer" : (data !== correct_answer && data === userAnswer ? "incorrect-answer" : (data !== correct_answer && data !== userAnswer ? "answer-not-chosen" : ""))) : "";
        return(
            <div key={index}>
                <input 
                    type="radio" 
                    value={data} 
                    className="radio-element" 
                    name={question}
                    id={data}
                    onClick={recordAnswer}
                    disabled={finished ? true : false}
                />
                <label htmlFor={data} className={answerColor}>{data}</label>
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