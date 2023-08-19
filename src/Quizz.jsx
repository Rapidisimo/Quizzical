import React from "react"
import {decode} from 'html-entities';
import Challenge from "./Challenge";

export default function Quizz() {

    const [trivia, setTrivia] = React.useState([]);

    React.useEffect( () => {
        // console.log('useEffect Ran')
        fetch('https://opentdb.com/api.php?amount=5&category=18&type=multiple')
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

    function checkAnswers() {
        setTrivia(prevData => prevData.map( data => {
            return{...data, finished: true}
        }))
        // console.log('CheckAnswers Initiated')
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
    
    console.log(trivia)
    return(
        <main>
            <h2>Quizz Placeholder</h2>
            {groupOfQuestions}
            <button onClick={checkAnswers}>Check Answers</button>
        </main>
    )
}