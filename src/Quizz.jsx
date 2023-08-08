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


    const groupOfQuestions = trivia.map( details => {
        // Using html-entities package to decode characters
        const decodedChar = decode(details.question);
        return(
            <Challenge 
                question={decodedChar}
                key={decodedChar}
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