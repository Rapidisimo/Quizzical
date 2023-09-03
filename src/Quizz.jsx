import React from "react"
import {decode} from 'html-entities';
import Challenge from "./Challenge";
import Confetti from 'react-confetti'
import ClipLoader from "react-spinners/ClipLoader";


export default function Quizz({apiSettings, setIntro}) {

    const {amount, category, type} = apiSettings
    // State to track Quiz data
    const [trivia, setTrivia] = React.useState([]);
    // To display a loader while loading data
    const [loadingData, setLoadingData] = React.useState(false)

    React.useEffect( () => {
        setLoadingData(true)
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
                        userAnswer: false,
                        id: index
                    }
                })
                setTrivia(updateTrivia)
                setTimeout( () => {
                    setLoadingData(false)
                },1000)
            })
    },[])

    // Spinner Loader while getting API data to display the Quiz
    function dataLoader() {
        return (
            <ClipLoader
            color={"#4D5B9E"}
            loading={loadingData}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            />
          )
      }

    // Random number generator for randomly entering answer into an array
    function randomIndex(num) {
        return Math.floor(Math.random() * num)
    }

    // Passing data to generate the group of questions, answers, and function to save responses
    const groupOfQuestions = trivia.map( (details, index) => {
        return(
            <Challenge
                key={index}
                questionData={details}
                recordAnswer={recordAnswer}
            />
        )
    })

    // Save the answer that is clicked to the userAnswer property in the question it belongs to
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

    // State used to score the Quiz, know when to show results and start again button
    const [quizResults, setQuizResults] = React.useState({correct: 0, incorrect: 0, displayResults: false})

    // If the Quiz has been completed this compares the answers to the correct answer and updates the QuizResults
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

    // State used to verify if all the questions have been answered in the Quiz
    const [missingAnswer, setMissingAnswer] = React.useState(false)

    // Runs when the user clicks the Check Answers button
    function checkAnswers() {
        // Checks if any of the questions hasn't been answered
        const verify = trivia.some(data => data.userAnswer === false);
        // If at least one hasn't been answered it updates the missingAnswer State and stops the function
        if(verify) {
            setMissingAnswer(true);
            return;
        }

        // set Missing answer back to false if it was true before
        setMissingAnswer(false)
        // Mark all questions finished
        setTrivia(prevData => prevData.map( data =>({...data, finished: true})))
        // Mark user answers as correct or incorrect *Could proably be refactored*
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

    // Be able to run results function once the trivia state has been updated and note before
    React.useEffect( () => {
        results()
    },[trivia])

    // Once results of quiz are displayed this changes the Intro state back in App.jsx to show the Intro again
    function startAgain() {
        setIntro(true)
    }
    // Shows a Check Answers or a Start Again button depending on the quizResults state
    function displayButton() {
        if(quizResults.displayResults) {
            return(<button className="quiz-page-btn" onClick={startAgain}>Start Again</button>)
        }else {return(<button className="quiz-page-btn" onClick={checkAnswers}>Check Answers</button>)}
    }
    
    return(
        <main>
            {loadingData ?             
            <div className="loader">{dataLoader()}</div>
                : 
            <>
                {quizResults.correct === trivia.length ? <Confetti /> : ""}
                {groupOfQuestions}
                <div className="results">
                    {missingAnswer ? <h3 className="missing-answers">Please answer all questions!</h3> : ""}
                    {quizResults.displayResults ? <h3>You got {quizResults.correct} out of {trivia.length} questions correct!</h3> : ""}
                    {displayButton()}
                </div>
            </>
            }
        </main>
    )
}
