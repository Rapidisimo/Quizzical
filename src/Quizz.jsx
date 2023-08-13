import React from "react"
import {decode} from 'html-entities';
import Challenge from "./Challenge";

export default function Quizz() {

    const [trivia, setTrivia] = React.useState([]);

    React.useEffect( () => {
        console.log('useEffect Ran')
        fetch('https://opentdb.com/api.php?amount=5&category=18&type=multiple')
            .then( (res) => res.json() )
            .then( (data) => setTrivia(data.results))
    },[])

    function randomIndex(num) {
        return Math.floor(Math.random() * num)
    }

    //Store user selected answer
    const [selectedAnswers, setSelectedAnswers] = React.useState([])

    const groupOfQuestions = trivia.map( details => {
        // Using html-entities package to decode characters through decode() method
        const decodedChar = decode(details.question);
        console.log(details) //TMP
        let allAnswers = [];
        const nonDecodedIncAnswers = details.incorrect_answers;
        const incAnswers = nonDecodedIncAnswers.map( data => (decode(data)))
        const corrAnswer = decode(details.correct_answer);
        allAnswers.push(...incAnswers)
        allAnswers.splice(randomIndex(allAnswers.length), 0, corrAnswer)
        console.log(allAnswers) //TMP
        return(
            <Challenge 
                key={decodedChar}
                question={decodedChar}
                incorrectAnswers={incAnswers} //Needed?
                correctAnswer={corrAnswer}
                choices={allAnswers}
                setSelectedAnswers={setSelectedAnswers}
            />
        )
    })

    return(
        <main>
            <h2>Quizz Placeholder</h2>
            {groupOfQuestions}
        </main>
    )
}