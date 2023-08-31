import React from "react"
import {decode} from 'html-entities';
import Challenge from "./Challenge";

export default function Quizz({apiSettings, setIntro}) {

    const {amount, category, type} = apiSettings
    const [trivia, setTrivia] = React.useState([]);

    React.useEffect( () => {
        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`)
            .then( (res) => res.json() )
            .then( (data) => {
                const updateTrivia = data.results.map( (item, index) => {
                    const decodedQuestion = decode(item.question)
                    const decodedCorrAnswer = decode(item.correct_answer)
                    const decodedIncAnswers = item.incorrect_answers.map( details => (decode(details)))
                    let allAnswers = []
                    allAnswers.push(...decodedIncAnswers)
                    allAnswers.splice(randomIndex(allAnswers.length), 0, decodedCorrAnswer) //Insert correct answer to a random index
                    return {
                        ...item,
                        question: decodedQuestion,
                        correct_answer: decodedCorrAnswer,
                        incorrect_answers: decodedIncAnswers,
                        allAnswers: allAnswers,
                        userAnswer: '',
                        id: index
                    }
                })
                setTrivia(updateTrivia)
            })
    },[])

    function randomIndex(num) {
        return Math.floor(Math.random() * num)
    }

    const groupOfQuestions = trivia.map( (details, index) => {
        return(
            <Challenge
                key={index}
                questionData={details}
                recordAnswer={recordAnswer}
            />
        )
    })

    function recordAnswer(e) {
        const question = e.target.name
        const userChoice = e.target.value
        setTrivia(prevData => prevData.map( questionData => {
                  if(questionData.question === question) {
                    return{...questionData, userAnswer: userChoice}
                  }else {
                    return {...questionData}
                  }
        }))
    }

    const [quizResults, setQuizResults] = React.useState({correct: 0, incorrect: 0, displayResults: false})

    const results = () => {
        
        trivia.map( details => {
            if(details.finished){
                setQuizResults(prevData => ({...prevData, displayResults: true}))
            }

            if(details.finished && details.choseCorrectly) {
                setQuizResults(prevData => ({...prevData, correct: prevData.correct + 1}))
            }else if(details.finished && !details.choseCorrectly) {
                setQuizResults(prevData => ({...prevData, incorrect: prevData.incorrect + 1}))
            }
        })
    }

    function checkAnswers() {
        setTrivia(prevData => prevData.map( data => {
            return{...data, finished: true}
        }))

        setTrivia(prevData => prevData.map( data => {
            if(data.correct_answer === data.userAnswer) {
                return{...data, choseCorrectly: true}
            }else if(data.userAnswer === '') {
                return {...data}
            }else {
                return {...data, choseCorrectly: false}
            }
        }))
    }

    React.useEffect( () => {
        results()
    },[trivia])

    // React.useEffect( () => {
    //     console.log(quizResults)
    // },[quizResults])

    function startAgain() {
        setIntro(true)
    }

    function displayButton() {
        if(quizResults.displayResults) {
            return(<button className="quiz-page-btn" onClick={startAgain}>Start Again</button>)
        }else {return(<button className="quiz-page-btn" onClick={checkAnswers}>Check Answers</button>)}
    }

    
    return(
        <main>
            {groupOfQuestions}
            <div className="results">
                {quizResults.displayResults ? <h3>You scored {quizResults.correct}/{trivia.length} correct answers!</h3> : ""}
                {displayButton()}
            </div>
        </main>
    )
}
