
export default function Challenge({questionData, recordAnswer}) {

    const {question, allAnswers, choseCorrectly, userAnswer, correct_answer, finished} = questionData
    // const test = finished ? (choseCorrectly ? console.log('Answwered Correctly') : console.log('Answwered Wrong')) : "";
    

    const answerOptions = allAnswers.map( (data, index) => {
        const answerColor = finished ? (data === correct_answer && data === userAnswer ? "correct-answer" : "") : "";
        return(
            <div key={index}>
                <input 
                    type="radio" 
                    value={data} 
                    className="radio-element" 
                    name={question} 
                    onClick={recordAnswer} />
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