import React from "react"
import {decode} from 'html-entities';
import Challenge from "./Challenge";

export default function Quizz() {

    const [trivia, setTrivia] = React.useState([]);

    React.useEffect( () => {
        console.log('useEffect Ran')
        fetch('https://opentdb.com/api.php?amount=5&category=18&type=multiple')
            .then( (res) => res.json() )
            .then( (data) => {
                const updateTrivia = data.results.map( (item) => {
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
                        userAnswer: ''
                    }
                })
                setTrivia(updateTrivia)
            })
    },[])
    console.log(trivia)

    function randomIndex(num) {
        return Math.floor(Math.random() * num)
    }

    // const groupOfQuestions = trivia.map( details => {
    //     // Using html-entities package to decode characters through decode() method
    //     const decodedChar = decode(details.question);
    //     console.log(details) //TMP
    //     let allAnswers = [];
    //     const nonDecodedIncAnswers = details.incorrect_answers;
    //     const incAnswers = nonDecodedIncAnswers.map( data => (decode(data)))
    //     const corrAnswer = decode(details.correct_answer);
    //     allAnswers.push(...incAnswers)
    //     allAnswers.splice(randomIndex(allAnswers.length), 0, corrAnswer)
    //     console.log(allAnswers) //TMP
    //     return(
    //         <Challenge 
    //             key={decodedChar}
    //             question={decodedChar}
    //             incorrectAnswers={incAnswers} //Needed?
    //             correctAnswer={corrAnswer}
    //             choices={allAnswers}
    //             setSelectedAnswers={setSelectedAnswers}
    //         />
    //     )
    // })

    // const groupOfQuestions = console.log(trivia)
    
    // setTrivia(prevData => {
    //     return {...prevData, testing: "OKAY"}
    // })

    const testy = console.log(trivia)

    return(
        <main>
            <h2>Quizz Placeholder</h2>
            {testy}
        </main>
    )
}